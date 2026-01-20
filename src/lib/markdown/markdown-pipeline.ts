import { PipelineExecutor, PipelineStep } from "@1_x7/pipeline";
import {
  MarkdownDocument,
  MarkdownSource,
  RawMarkdownDocument,
} from "./core/types";
import { FrontmatterExtractor } from "./frontmatter-extractor";
import path from "path";
import { LocalFileSystemConnector } from "./connectors/local-fs-connecter";
import z from "zod";
import { contentStore } from "./core/content-store";

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

type Ctx = {
  rawFiles: RawMarkdownDocument[];
  processedFiles: MarkdownDocument[];
};

export async function runMarkdownPipelineAsync(): Promise<void> {
  const executor = new PipelineExecutor<Ctx>();
  const extractor = new FrontmatterExtractor();

  const steps: PipelineStep<Ctx>[] = [];

  for (const source of SOURCES) {
    // Source step - doesn't read from context
    steps.push({
      id: "readFiles",
      dependsOn: [],
      execute: async () => {
        const rawFiles = await source.connector.getAll();
        return {
          rawFiles,
        };
      },
    });
    steps.push({
      id: "extractFrontmatter",
      dependsOn: ["readFiles"],
      execute: (context) => {
        const rawFiles = context.get("rawFiles");
        const processedFiles = rawFiles!.map((rawFile) => ({
          ...rawFile,
          frontmatter: extractor.extract(rawFile.content, source.schema),
        }));
        return {
          processedFiles,
        };
      },
    });
    steps.push({
      id: "setContentStore",
      dependsOn: ["extractFrontmatter"],
      execute: (context) => {
        const processedFiles = context.get("processedFiles");
        contentStore.register("allBlogs", processedFiles!);
      },
    });
  }

  const context = await executor.runAsync(steps);
  console.log(context);
}
