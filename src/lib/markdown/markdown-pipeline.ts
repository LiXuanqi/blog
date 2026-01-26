import { ContentTypeRegistry } from "./core/content-types";
import { BaseFrontmatter, BLOG_FRONTMATTER_SCHEMA } from "./core/frontmatter";
import {
  ContentCollectionId,
  FrontmatterSchema,
  MarkdownDocument,
  MarkdownSource,
} from "./core/types";
import { FrontmatterExtractor } from "./frontmatter-extractor";
import path from "path";
import { LocalFileSystemConnector } from "./connectors/local-fs-connecter";
import {
  makeMarkdownCollection,
  MarkdownCollection,
} from "./core/markdown-collection";
import { enrichLanguage } from "./language-decorator";

const SOURCES: MarkdownSource<typeof BLOG_FRONTMATTER_SCHEMA>[] = [
  {
    id: "blogs",
    connector: new LocalFileSystemConnector({
      contentDir: path.join(process.cwd(), "content/blogs"),
      sourceId: "blogs",
    }),
    frontmatterSchema: BLOG_FRONTMATTER_SCHEMA,
  },
];

type MarkdownCollections = Array<{
  id: ContentCollectionId;
  collection: ContentTypeRegistry[ContentCollectionId];
}>;

export async function runMarkdownPipelineAsync(): Promise<MarkdownCollections> {
  console.log("Starting _runMarkdownPipelineAsync");
  return await buildCollectionsFromSourcesAsync(SOURCES);
}

export async function buildCollectionsFromSourcesAsync(
  sources: MarkdownSource<typeof BLOG_FRONTMATTER_SCHEMA>[],
): Promise<MarkdownCollections> {
  const collections: MarkdownCollections = [];

  for (const source of sources) {
    const markdownConnection =
      await _makeMarkdownCollectionFromSourceAsync(source);
    collections.push({ id: source.id, collection: markdownConnection });
  }
  return collections;
}

async function _makeMarkdownCollectionFromSourceAsync<
  TSchema extends FrontmatterSchema,
>(
  source: MarkdownSource<TSchema>,
): Promise<MarkdownCollection<BaseFrontmatter>> {
  const frontmatterExtractor = new FrontmatterExtractor();

  const rawFiles = await source.connector.getAll();

  const processedFiles = rawFiles.map((rawFile) => {
    const file = frontmatterExtractor.enrich(rawFile, source.frontmatterSchema);
    enrichLanguage(file);
    return file as MarkdownDocument<BaseFrontmatter>;
  });

  return makeMarkdownCollection(processedFiles);
}
