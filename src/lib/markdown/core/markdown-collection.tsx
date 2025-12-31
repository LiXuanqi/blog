import { MarkdownDocument } from "./types";

export class MarkdownCollection {
  private processedDocuments: MarkdownDocument[];
  private processedBySlug: Map<string, MarkdownDocument>;

  constructor(processedDocuments: MarkdownDocument[]) {
    this.processedDocuments = processedDocuments;

    // Build lookup map for fast access
    this.processedBySlug = new Map();
    processedDocuments.forEach((doc) => {
      this.processedBySlug.set(doc.slug, doc);
    });
  }

  getAll<T = Record<string, unknown>>(): MarkdownDocument<T>[] {
    return this.processedDocuments as MarkdownDocument<T>[];
  }

  getBySlug<T = Record<string, unknown>>(
    slug: string,
  ): MarkdownDocument<T> | null {
    const doc = this.processedBySlug.get(slug);
    return doc ? (doc as MarkdownDocument<T>) : null;
  }
}
