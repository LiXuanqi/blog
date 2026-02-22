import fs from "fs/promises";
import path from "path";
import {
  BaseFrontmatter,
  BLOG_FRONTMATTER_SCHEMA,
  LINK_FRONTMATTER_SCHEMA,
  NOTE_FRONTMATTER_SCHEMA,
} from "./frontmatter.ts";
import { LocalFileSystemConnector } from "./local-fs-connector.ts";
import {
  ContentCollectionId,
  IndexJson,
  LanguageKey,
  MarkdownDocument,
  MarkdownSource,
} from "./types.ts";
import { withLanguage } from "./language-decorator.ts";
import { withFrontmatter } from "./frontmatter-decorator.ts";
import {
  toCanonicalSlug,
  withAvailableLanguages,
} from "./available-languages-decorator.ts";
import { extractTocFromMarkdown, processTocItems } from "./toc.ts";

const SOURCES: MarkdownSource[] = [
  {
    id: "blogs",
    connector: new LocalFileSystemConnector({
      contentDir: path.join(process.cwd(), "content/blogs"),
      sourceId: "blogs",
    }),
    frontmatterSchema: BLOG_FRONTMATTER_SCHEMA,
  },
  {
    id: "notes",
    connector: new LocalFileSystemConnector({
      contentDir: path.join(process.cwd(), "content/notes"),
      sourceId: "notes",
    }),
    frontmatterSchema: NOTE_FRONTMATTER_SCHEMA,
  },
  {
    id: "links",
    connector: new LocalFileSystemConnector({
      contentDir: path.join(process.cwd(), "content/links"),
      sourceId: "links",
    }),
    frontmatterSchema: LINK_FRONTMATTER_SCHEMA,
  },
];

const OUTPUT_DIR = path.join(process.cwd(), "src/generated/content");
const TEMP_OUTPUT_DIR = path.join(process.cwd(), "src/generated/.content-tmp");

type GeneratedCollection = {
  id: ContentCollectionId;
  documents: MarkdownDocument<BaseFrontmatter>[];
};

export async function runContentGeneratorAsync(): Promise<void> {
  console.log("[content-generator] starting");
  const collections = await buildDocumentsFromSourcesAsync(SOURCES);
  await writeArtifactsAsync(collections);
  console.log("[content-generator] done");
}

async function buildDocumentsFromSourcesAsync(
  sources: MarkdownSource[],
): Promise<GeneratedCollection[]> {
  const collections: GeneratedCollection[] = [];

  for (const source of sources) {
    const rawFiles = await source.connector.getAll();
    const processedFiles = rawFiles.map((rawFile) =>
      withLanguage(withFrontmatter(rawFile, source.frontmatterSchema)),
    ) as MarkdownDocument<BaseFrontmatter>[];

    collections.push({
      id: source.id,
      documents: withAvailableLanguages(processedFiles),
    });
  }

  return collections;
}

async function writeArtifactsAsync(
  collections: GeneratedCollection[],
): Promise<void> {
  await fs.rm(TEMP_OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(TEMP_OUTPUT_DIR, { recursive: true });

  const index: IndexJson = {
    version: 1,
    generatedAt: new Date().toISOString(),
    collections: {
      blogs: { en: [], zh: [] },
      notes: { en: [], zh: [] },
      links: { en: [], zh: [] },
    },
  };

  for (const collection of collections) {
    for (const doc of collection.documents) {
      const canonicalSlug = toCanonicalSlug(doc.slug, doc.language);
      const outputFilePath = path.join(
        TEMP_OUTPUT_DIR,
        collection.id,
        doc.language,
        `${canonicalSlug}.json`,
      );

      await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
      await fs.writeFile(
        outputFilePath,
        JSON.stringify(
          {
            version: 1,
            collection: collection.id,
            slug: canonicalSlug,
            language: doc.language,
            availableLanguages: doc.availableLanguages ?? [],
            frontmatter: doc.frontmatter,
            content: doc.content,
            tocItems: processTocItems(extractTocFromMarkdown(doc.content)),
          },
          null,
          2,
        ),
        "utf8",
      );

      index.collections[collection.id][doc.language].push({
        slug: canonicalSlug,
        title: doc.frontmatter.title,
        date: doc.frontmatter.date,
        language: doc.language,
        availableLanguages: doc.availableLanguages ?? [],
      });
    }
  }

  sortIndex(index);
  await fs.writeFile(
    path.join(TEMP_OUTPUT_DIR, "index.json"),
    JSON.stringify(index, null, 2),
    "utf8",
  );

  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.rename(TEMP_OUTPUT_DIR, OUTPUT_DIR);
}

function sortIndex(index: IndexJson): void {
  const collections: ContentCollectionId[] = ["blogs", "notes", "links"];
  const languages: LanguageKey[] = ["en", "zh"];

  for (const collection of collections) {
    for (const language of languages) {
      index.collections[collection][language].sort((a, b) => {
        const dateDiff =
          new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateDiff !== 0) {
          return dateDiff;
        }
        return a.slug.localeCompare(b.slug);
      });
    }
  }
}
