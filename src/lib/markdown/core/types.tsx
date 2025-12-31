export interface MarkdownDocument<T = Record<string, unknown>> {
  slug: string;
  content: string;
  frontmatter: T;
  excerpt?: string;
  readingTime?: number;
  lastModified?: Date;
  source: string;
}

export interface MarkdownConnector {
  getAll(): Promise<MarkdownDocument[]>;
  getBySlug(slug: string): Promise<MarkdownDocument | null>;
}

export interface MarkdownSource {
  id: string;
  connector: MarkdownConnector;
}

export type MarkdownProcessorConfig = {
  sources: MarkdownSource[];
};
