import fs from "fs/promises";
import path from "path";
import { BaseFrontmatter } from "@/lib/content/frontmatter";
import { LanguageKey, MarkdownDocument, TocItem } from "@/lib/content/types";

type GeneratedCollectionId = "blogs" | "notes" | "links";

type GeneratedListItem = {
  slug: string;
  title: string;
  date: string;
  language: LanguageKey;
  availableLanguages: LanguageKey[];
};

type GeneratedDocumentFile = {
  version: number;
  collection: GeneratedCollectionId;
  slug: string;
  language: LanguageKey;
  availableLanguages: LanguageKey[];
  frontmatter: BaseFrontmatter & Record<string, unknown>;
  content: string;
  tocItems?: TocItem[];
};

type GeneratedIndex = {
  version: number;
  generatedAt: string;
  collections: Record<
    GeneratedCollectionId,
    Record<LanguageKey, GeneratedListItem[]>
  >;
};

const GENERATED_DIR = path.join(process.cwd(), "src/generated/content");
const GENERATED_INDEX_PATH = path.join(GENERATED_DIR, "index.json");
const SHOULD_CACHE = process.env.NODE_ENV === "production";

let indexPromise: Promise<GeneratedIndex> | null = null;
const documentPromiseCache = new Map<
  string,
  Promise<GeneratedDocumentFile | null>
>();

export async function getGeneratedPostListAsync(
  collection: GeneratedCollectionId,
  lang: LanguageKey,
): Promise<GeneratedListItem[]> {
  const index = await getGeneratedIndexAsync();
  return index.collections[collection][lang] ?? [];
}

export async function getGeneratedPostBySlugAsync(
  collection: GeneratedCollectionId,
  lang: LanguageKey,
  slug: string,
): Promise<MarkdownDocument<BaseFrontmatter & Record<string, unknown>> | null> {
  const doc = await getGeneratedDocumentAsync(collection, lang, slug);
  if (!doc) {
    return null;
  }

  return {
    slug: doc.slug,
    content: doc.content,
    frontmatter: doc.frontmatter,
    source: "generated",
    sourceId: doc.collection,
    language: doc.language,
    availableLanguages: doc.availableLanguages,
    tocItems: doc.tocItems ?? [],
  };
}

export async function getGeneratedStaticParamsAsync(
  collection: GeneratedCollectionId,
): Promise<Array<{ lang: LanguageKey; slug: string }>> {
  const index = await getGeneratedIndexAsync();
  const params: Array<{ lang: LanguageKey; slug: string }> = [];

  for (const lang of ["en", "zh"] as const) {
    for (const item of index.collections[collection][lang]) {
      params.push({
        lang,
        slug: item.slug,
      });
    }
  }

  return params;
}

export async function getGeneratedLinksStaticParamsAsync(): Promise<
  Array<{ slug: string }>
> {
  const links = await getGeneratedPostListAsync("links", "en");
  return links.map((link) => ({ slug: link.slug }));
}

async function getGeneratedIndexAsync(): Promise<GeneratedIndex> {
  if (!SHOULD_CACHE) {
    return await readJsonFileAsync<GeneratedIndex>(
      GENERATED_INDEX_PATH,
      "generated content index",
    );
  }

  if (!indexPromise) {
    indexPromise = readJsonFileAsync<GeneratedIndex>(
      GENERATED_INDEX_PATH,
      "generated content index",
    );
  }
  return indexPromise;
}

async function getGeneratedDocumentAsync(
  collection: GeneratedCollectionId,
  lang: LanguageKey,
  slug: string,
): Promise<GeneratedDocumentFile | null> {
  if (!SHOULD_CACHE) {
    const filePath = path.join(GENERATED_DIR, collection, lang, `${slug}.json`);
    return await readJsonFileAsync<GeneratedDocumentFile>(filePath).catch(
      (error: unknown) => {
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          error.code === "ENOENT"
        ) {
          return null;
        }
        throw error;
      },
    );
  }

  const cacheKey = `${collection}:${lang}:${slug}`;
  const existing = documentPromiseCache.get(cacheKey);
  if (existing) {
    return existing;
  }

  const filePath = path.join(GENERATED_DIR, collection, lang, `${slug}.json`);
  const promise = readJsonFileAsync<GeneratedDocumentFile>(filePath).catch(
    (error: unknown) => {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return null;
      }
      throw error;
    },
  );

  documentPromiseCache.set(cacheKey, promise);
  return promise;
}

async function readJsonFileAsync<T>(
  filePath: string,
  label = "generated content file",
): Promise<T> {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      throw new Error(
        `Missing ${label} at ${filePath}. Run \`pnpm generate:content\` first.`,
      );
    }
    throw error;
  }
}
