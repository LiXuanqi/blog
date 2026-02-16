import { ContentTypeRegistry } from "./core/content-types";
import {
  BaseFrontmatter,
  BLOG_FRONTMATTER_SCHEMA,
  NOTE_FRONTMATTER_SCHEMA,
} from "./core/frontmatter";
import {
  ContentCollectionId,
  MarkdownDocument,
  MarkdownSource,
} from "./core/types";
import path from "path";
import { LocalFileSystemConnector } from "./connectors/local-fs-connecter";
import {
  makeMarkdownCollection,
  MarkdownCollection,
} from "./core/markdown-collection";
import { withLanguage } from "./decorator/language-decorator";
import { withFrontmatter } from "./decorator/frontmatter-decorator";

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
  sources: MarkdownSource[],
): Promise<MarkdownCollections> {
  const collections: MarkdownCollections = [];

  for (const source of sources) {
    const markdownConnection =
      await _makeMarkdownCollectionFromSourceAsync(source);
    collections.push({ id: source.id, collection: markdownConnection });
  }
  return collections;
}

async function _makeMarkdownCollectionFromSourceAsync(
  source: MarkdownSource,
): Promise<MarkdownCollection<BaseFrontmatter>> {
  const rawFiles = await source.connector.getAll();

  const processedFiles = rawFiles.map((rawFile) => {
    return withLanguage(
      withFrontmatter(rawFile, source.frontmatterSchema),
    ) as MarkdownDocument<BaseFrontmatter>;
  });

  return makeMarkdownCollection(processedFiles);
}
