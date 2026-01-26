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

export async function runMarkdownPipelineAsync(): Promise<
  Array<{
    id: ContentCollectionId;
    collection: ContentTypeRegistry[ContentCollectionId];
  }>
> {
  console.log("Starting _runMarkdownPipelineAsync");
  const collections: Array<{
    id: ContentCollectionId;
    collection: ContentTypeRegistry[ContentCollectionId];
  }> = [];
  for (const source of SOURCES) {
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

  const processedFiles = rawFiles.map((rawFile) =>
    frontmatterExtractor.enrich(rawFile, source.frontmatterSchema),
  ) as MarkdownDocument<BaseFrontmatter>[];

  return makeMarkdownCollection(processedFiles);
}
