import {
  MarkdownProcessorConfig,
  MarkdownSource,
  RawMarkdownDocument,
} from "./types";
import { MarkdownParserChain } from "../parsers/parser-chain";
import { FrontMatterParser } from "../parsers/frontmatter-parser";
import { MarkdownCollection } from "./markdown-collection";

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

  async process(sourceId?: string): Promise<MarkdownCollection> {
    const rawDocs = await this.getRawAll(sourceId);
    const processedDocs = rawDocs.map((raw) => this.parserChain.parse(raw));
    return new MarkdownCollection(processedDocs);
  }
}
