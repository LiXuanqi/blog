import {
  MarkdownProcessorConfig,
  MarkdownSource,
  RawMarkdownDocument,
  MarkdownDocument,
} from "./types";
import { MarkdownParserChain } from "../parsers/parser-chain";
import { FrontMatterParser } from "../parsers/frontmatter-parser";
import { contentStore } from "./content-store";
import { z } from "zod";

export class MarkdownProcessor {
  private sources: Map<string, MarkdownSource>;
  private parserChain: MarkdownParserChain;

  constructor(config: MarkdownProcessorConfig) {
    this.sources = new Map();
    config.sources.forEach((source) => {
      this.sources.set(source.id, source);
    });

    // Initialize parser chain with FrontMatterParser
    this.parserChain = new MarkdownParserChain().add(new FrontMatterParser());
  }

  async getRawAll(sourceId?: string): Promise<RawMarkdownDocument[]> {
    if (sourceId) {
      const source = this.sources.get(sourceId);
      if (!source) throw new Error(`Source ${sourceId} not found`);
      return source.connector.getAll();
    }

    const allDocuments: RawMarkdownDocument[] = [];
    for (const source of this.sources.values()) {
      const docs = await source.connector.getAll();
      allDocuments.push(...docs);
    }
    return allDocuments;
  }

  async process(): Promise<void> {
    for (const source of this.sources.values()) {
      const rawDocs = await source.connector.getAll();

      if (source.id === "blogs") {
        contentStore.register("rawBlogs", rawDocs);
      }

      const processedDocs = rawDocs.map((raw) =>
        this.processDocument(raw, source.schema),
      );

      if (source.id === "blogs") {
        contentStore.register("allBlogs", processedDocs);
      }

      // Register each source as a separate collection in the content store
      //   const collection = new MarkdownCollection(processedDocs);
    }
  }

  private processDocument(
    raw: RawMarkdownDocument,
    schema: z.ZodSchema,
  ): MarkdownDocument {
    const context = {
      slug: raw.slug,
      source: raw.source,
      sourceId: raw.sourceId,
      rawContent: raw.content,
      schema,
    };
    return this.parserChain.parse(context);
  }
}
