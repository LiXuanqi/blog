import { PipelineExecutor, createStep } from "../pipeline";
import { MarkdownProcessorConfig } from "./core/types";
import { FrontmatterExtractor } from "./frontmatter-extractor";

/**
 * Pipeline-based markdown processor
 */
export class PipelineMarkdownProcessor {
  private config: MarkdownProcessorConfig;
  private executor: PipelineExecutor;
  private extractor: FrontmatterExtractor;

  constructor(config: MarkdownProcessorConfig) {
    this.config = config;
    this.executor = new PipelineExecutor();
    this.extractor = new FrontmatterExtractor();
  }

  async process(): Promise<void> {
    const steps = [];

    for (const source of this.config.sources) {
      // Source step - doesn't read from context
      steps.push(
        createStep(source.id)
          .execute(async () => await source.connector.getAll())
          .build(),
      );

      // Extract frontmatter step
      steps.push(
        createStep(`${source.id}_extracted`)
          .execute(async (context) => {
            const rawDocs = context.get(source.id);
            const extractedData = rawDocs.map((raw) => ({
              ...raw,
              frontmatter: this.extractor.extract(raw.content, source.schema),
            }));
            return extractedData;
          })
          .build(),
      );
    }

    // Debug step - print context data
    steps.push(
      createStep("debug")
        .execute((context) => {
          console.log("Pipeline Context Data:");
          const allData = context.getAll();
          for (const [key, value] of Object.entries(allData)) {
            console.log(
              `  ${key}:`,
              Array.isArray(value) ? `Array(${value.length})` : typeof value,
            );
          }
          return "Debug completed";
        })
        .build(),
    );

    const result = await this.executor.execute({ steps });
    if (!result.success) {
      throw new Error(`Pipeline failed: ${result.error?.message}`);
    }
  }
}
