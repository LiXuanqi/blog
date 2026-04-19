import fs from "fs/promises";
import { COLLECTION_CONFIGS, OUTPUT_DIR, TEMP_OUTPUT_DIR } from "./config.ts";
import type {
  CollectionConfig,
  ContentCollectionId,
  GeneratedCollection,
  IndexJson,
  LanguageKey,
  MarkdownDocument,
  PipelineDocument,
} from "./types.ts";

export async function runContentGeneratorAsync(): Promise<void> {
  const mode = getContentGenerationMode();
  console.log(`[content-generator] starting (${mode})`);
  const collections = await buildCollectionsAsync(COLLECTION_CONFIGS);
  await writeArtifactsAsync(collections);
  console.log(`[content-generator] done (${mode})`);
}

export function getContentGenerationMode(): "development" | "production" {
  return process.env.NODE_ENV === "production" ? "production" : "development";
}

async function buildCollectionsAsync(
  collectionConfigs: CollectionConfig[],
): Promise<GeneratedCollection[]> {
  const collections: GeneratedCollection[] = [];

  for (const config of collectionConfigs) {
    const rawDocuments = await config.loader.getAll();
    let documents: PipelineDocument[] = rawDocuments.map((document) => ({
      ...document,
    }));

    for (const plugin of config.documentPlugins) {
      documents = await Promise.all(
        documents.map((document) => plugin.apply(document)),
      );
    }

    for (const plugin of config.collectionPlugins) {
      documents = await plugin.apply(documents);
    }

    collections.push({
      id: config.id,
      documents: documents.map((document) =>
        toGeneratedDocument(config.id, document),
      ),
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
      links: { en: [], zh: [] },
    },
  };

  for (const config of COLLECTION_CONFIGS) {
    const collection = collections.find((item) => item.id === config.id);
    if (!collection) {
      continue;
    }

    const indexItems = await config.emitter.emit(collection, TEMP_OUTPUT_DIR);
    for (const item of indexItems) {
      index.collections[collection.id][item.language].push(item);
    }
  }

  sortIndex(index);
  await fs.writeFile(
    `${TEMP_OUTPUT_DIR}/index.json`,
    JSON.stringify(index, null, 2),
    "utf8",
  );

  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.rename(TEMP_OUTPUT_DIR, OUTPUT_DIR);
}

function toGeneratedDocument(
  collectionId: ContentCollectionId,
  document: PipelineDocument,
): MarkdownDocument<Record<string, unknown>> {
  if (!document.frontmatter) {
    throw new Error(`Missing frontmatter for ${collectionId}/${document.slug}`);
  }
  if (!document.language) {
    throw new Error(`Missing language for ${collectionId}/${document.slug}`);
  }

  return {
    slug: document.slug,
    content: document.content,
    frontmatter: document.frontmatter,
    source: document.source,
    sourceId: document.sourceId,
    language: document.language,
    availableLanguages: document.availableLanguages ?? [],
    tocItems: document.tocItems ?? [],
  };
}

function sortIndex(index: IndexJson): void {
  const collections: ContentCollectionId[] = ["blogs", "links"];
  const languages: LanguageKey[] = ["en", "zh"];

  for (const collection of collections) {
    for (const language of languages) {
      index.collections[collection][language].sort((a, b) => {
        const aDate = a.date
          ? new Date(a.date).getTime()
          : Number.NEGATIVE_INFINITY;
        const bDate = b.date
          ? new Date(b.date).getTime()
          : Number.NEGATIVE_INFINITY;

        if (aDate !== bDate) {
          return bDate - aDate;
        }
        return a.slug.localeCompare(b.slug);
      });
    }
  }
}
