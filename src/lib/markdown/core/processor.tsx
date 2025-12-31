import {
  MarkdownProcessorConfig,
  MarkdownSource,
  MarkdownDocument,
} from "./types";

export class MarkdownProcessor {
  private sources: Map<string, MarkdownSource>;

  constructor(config: MarkdownProcessorConfig) {
    this.sources = new Map();
    config.sources.forEach((source) => {
      this.sources.set(source.id, source);
    });
  }

  async getAll<T = Record<string, unknown>>(
    sourceId?: string,
  ): Promise<MarkdownDocument<T>[]> {
    if (sourceId) {
      const source = this.sources.get(sourceId);
      if (!source) throw new Error(`Source ${sourceId} not found`);
      return source.connector.getAll();
    }

    const allDocuments: MarkdownDocument<T>[] = [];
    for (const source of this.sources.values()) {
      const docs = await source.connector.getAll();
      allDocuments.push(...docs);
    }
    return allDocuments;
  }

  async getBySlug<T = Record<string, unknown>>(
    slug: string,
    sourceId?: string,
  ): Promise<MarkdownDocument<T> | null> {
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
}
