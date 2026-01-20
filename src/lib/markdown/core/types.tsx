export interface RawMarkdownDocument {
  slug: string;
  content: string;
  source: string;
  sourceId: string;
}

export interface MarkdownDocument<T = Record<string, unknown>> {
  slug: string;
  content: string;
  frontmatter: T;
  excerpt?: string;
  readingTime?: number;
  lastModified?: Date;
  source: string;
  sourceId: string;
}

export interface MarkdownConnector {
  getAll(): Promise<RawMarkdownDocument[]>;
  getBySlug(slug: string): Promise<RawMarkdownDocument | null>;
}

import { z } from "zod";

export interface MarkdownSource<TSchema extends z.ZodTypeAny = z.ZodTypeAny> {
  id: string;
  connector: MarkdownConnector;
  schema: TSchema;
}
