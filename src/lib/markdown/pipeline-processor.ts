import { PipelineExecutor, createStep } from "../pipeline";
import { MarkdownProcessorConfig } from "./core/types";
import { MarkdownCollection } from "./core/markdown-collection";
import { contentStore } from "./core/content-store";
import { MarkdownParserChain } from "./parsers/parser-chain";
import { FrontMatterParser } from "./parsers/frontmatter-parser";

/**
 * Pipeline-based markdown processor using DAG execution
 */
export class PipelineMarkdownProcessor {
  private config: MarkdownProcessorConfig;
  private executor: PipelineExecutor;
  private parserChain: MarkdownParserChain;

  constructor(config: MarkdownProcessorConfig) {
    this.config = config;
    this.executor = new PipelineExecutor();

    // Initialize parser chain
    this.parserChain = new MarkdownParserChain().add(new FrontMatterParser());
  }

  async process(): Promise<void> {
    // Create pipeline steps for each source
    const steps = [];

    for (const source of this.config.sources) {
      // Step 1: Load raw documents
      steps.push(
        createStep(`loadRaw_${source.id}`)
          .name(`Load Raw ${source.id}`)
          .description(`Load raw markdown files for ${source.id}`)
          .execute(async () => {
            return await source.connector.getAll();
          })
          .build(),
      );

      // Step 2: Parse documents
      steps.push(
        createStep(`parse_${source.id}`)
          .name(`Parse ${source.id}`)
          .description(`Parse markdown documents for ${source.id}`)
          .execute(async (context) => {
            const rawDocs = context.get(`loadRaw_${source.id}`);
            return rawDocs.map((raw) => {
              const parseContext = {
                slug: raw.slug,
                source: raw.source,
                sourceId: raw.sourceId,
                rawContent: raw.content,
                schema: source.schema,
              };
              return this.parserChain.parse(parseContext);
            });
          })
          .build(),
      );

      // Step 3: Create collection
      steps.push(
        createStep(`collection_${source.id}`)
          .name(`Create ${source.id} Collection`)
          .description(`Create MarkdownCollection for ${source.id}`)
          .execute(async (context) => {
            const processedDocs = context.get(`parse_${source.id}`);
            return new MarkdownCollection(processedDocs);
          })
          .build(),
      );

      // Step 4: Register to content store
      steps.push(
        createStep(`register_${source.id}`)
          .name(`Register ${source.id}`)
          .description(`Register ${source.id} collection to content store`)
          .execute(async (context) => {
            const collection = context.get(`collection_${source.id}`);
            contentStore.register(source.id, collection);
            return `Registered ${source.id}`;
          })
          .build(),
      );
    }

    // Execute the pipeline
    const result = await this.executor.execute(steps);

    if (!result.success) {
      throw new Error(
        `Pipeline failed at step "${result.failedStep}": ${result.error?.message}`,
      );
    }

    console.log(`Pipeline completed successfully in ${result.duration}ms`);
    console.log(`Executed steps: ${result.executedSteps.join(" → ")}`);
  }

  /**
   * Process a single source by ID
   */
  async processSource(sourceId: string): Promise<void> {
    const source = this.config.sources.find((s) => s.id === sourceId);
    if (!source) {
      throw new Error(`Source "${sourceId}" not found`);
    }

    const steps = [
      createStep(`loadRaw_${sourceId}`)
        .execute(async () => await source.connector.getAll())
        .build(),

      createStep(`parse_${sourceId}`)
        .execute(async (context) => {
          const rawDocs = context.get(`loadRaw_${sourceId}`);
          return rawDocs.map((raw) => {
            const parseContext = {
              slug: raw.slug,
              source: raw.source,
              sourceId: raw.sourceId,
              rawContent: raw.content,
              schema: source.schema,
            };
            return this.parserChain.parse(parseContext);
          });
        })
        .build(),

      createStep(`collection_${sourceId}`)
        .execute(async (context) => {
          const processedDocs = context.get(`parse_${sourceId}`);
          return new MarkdownCollection(processedDocs);
        })
        .build(),

      createStep(`register_${sourceId}`)
        .execute(async (context) => {
          const collection = context.get(`collection_${sourceId}`);
          contentStore.register(sourceId, collection);
          return `Registered ${sourceId}`;
        })
        .build(),
    ];

    const result = await this.executor.execute(steps);

    if (!result.success) {
      throw new Error(
        `Failed to process source "${sourceId}": ${result.error?.message}`,
      );
    }
  }

  /**
   * Get pipeline execution context for debugging
   */
  async getDebugInfo(): Promise<Record<string, unknown>> {
    const steps = [
      createStep("debug")
        .execute((context) => context.getAll())
        .build(),
    ];

    const result = await this.executor.execute(steps);
    return result.context.getAll();
  }
}
