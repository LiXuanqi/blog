import { MarkdownDocument, MarkdownSource } from "./core/types";
import { FrontmatterExtractor } from "./frontmatter-extractor";
import path from "path";
import { LocalFileSystemConnector } from "./connectors/local-fs-connecter";
import z from "zod";
import {
  makeMarkdownCollection,
  MarkdownCollection,
} from "./core/markdown-collection";

const BLOG_SCHEMA = z.object({
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
    schema: BLOG_SCHEMA,
  },
];

export async function runMarkdownPipelineAsync(): Promise<void> {
  for (const source of SOURCES) {
    const markdownConnection =
      await _makeMarkdownCollectionFromSourceAsync(source);
    // contentStore.register(source.id, markdownConnection);
    console.log(markdownConnection.getList());

    // console.log(contentStore.get(source.id).getList());
  }
}

async function _makeMarkdownCollectionFromSourceAsync(
  source: MarkdownSource,
): Promise<MarkdownCollection> {
  const extractor = new FrontmatterExtractor();

  const rawFiles = await source.connector.getAll();

  const processedFiles: MarkdownDocument[] = [];

  for (const rawFile of rawFiles) {
    processedFiles.push({
      ...rawFile,
      frontmatter: extractor.extract(rawFile.content, source.schema),
    });
  }

  return makeMarkdownCollection(processedFiles);
}
