import {
  MarkdownProcessorConfig,
  MarkdownSource,
  MarkdownDocument,
  RawMarkdownDocument,
} from "./types";
import { MarkdownParserChain } from "../parsers/parser-chain";
import { FrontMatterParser } from "../parsers/frontmatter-parser";

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

  async getAll<T = Record<string, unknown>>(
    sourceId?: string,
  ): Promise<MarkdownDocument<T>[]> {
    const rawDocs = await this.getRawAll(sourceId);
    return rawDocs.map((raw) => this.parserChain.parse<T>(raw));
  }

  async getRawBySlug(
    slug: string,
    sourceId?: string,
  ): Promise<RawMarkdownDocument | null> {
    if (sourceId) {
      const source = this.sources.get(sourceId);
      if (!source) throw new Error(`Source ${sourceId} not found`);
      return source.connector.getBySlug(slug);
    }

    for (const source of this.sources.values()) {
      const doc = await source.connector.getBySlug(slug);
      if (doc) return doc;
    }
    return null;
  }

  async getBySlug<T = Record<string, unknown>>(
    slug: string,
    sourceId?: string,
  ): Promise<MarkdownDocument<T> | null> {
    const rawDoc = await this.getRawBySlug(slug, sourceId);
    return rawDoc ? this.parserChain.parse<T>(rawDoc) : null;
  }
}
