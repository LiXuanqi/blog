import { ContentCollectionId, MarkdownSource } from "./core/types";
import { FrontmatterExtractor } from "./frontmatter-extractor";
import path from "path";
import { LocalFileSystemConnector } from "./connectors/local-fs-connecter";
import z from "zod";
import {
  makeMarkdownCollection,
  MarkdownCollection,
} from "./core/markdown-collection";

const BLOG_FRONTMATTER_SCHEMA = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  visible: z.boolean().optional(),
});

const SOURCES: MarkdownSource[] = [
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
  Array<{ id: ContentCollectionId; collection: MarkdownCollection }>
> {
  console.log("Starting _runMarkdownPipelineAsync");
  const collections: Array<{
    id: ContentCollectionId;
    collection: MarkdownCollection;
  }> = [];
  for (const source of SOURCES) {
    const markdownConnection =
      await _makeMarkdownCollectionFromSourceAsync(source);
    collections.push({ id: source.id, collection: markdownConnection });
  }
  return collections;
}

async function _makeMarkdownCollectionFromSourceAsync<
  TSchema extends z.ZodTypeAny,
>(
  source: MarkdownSource<TSchema>,
): Promise<MarkdownCollection<z.infer<TSchema>>> {
  const frontmatterExtractor = new FrontmatterExtractor();

  const rawFiles = await source.connector.getAll();

  const processedFiles = rawFiles.map((rawFile) =>
    frontmatterExtractor.enrich(rawFile, source.frontmatterSchema),
  );

  return makeMarkdownCollection(processedFiles);
}
