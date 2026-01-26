export interface RawMarkdownDocument {
  slug: string;
  content: string;
  source: string;
  sourceId: string;
}

export type LanguageKey = "en" | "zh";

export interface MarkdownDocument<T = Record<string, unknown>> {
  slug: string;
  content: string;
  frontmatter: T;
  excerpt?: string;
  readingTime?: number;
  lastModified?: Date;
  source: string;
  sourceId: string;
  language: LanguageKey;
}

export interface MarkdownConnector {
  getAll(): Promise<RawMarkdownDocument[]>;
  getBySlug(slug: string): Promise<RawMarkdownDocument | null>;
}

import { z } from "zod";

export type ContentCollectionId = "blogs" | "notes";

export type FrontmatterSchema = z.ZodTypeAny;

export interface MarkdownSource<
  TSchema extends FrontmatterSchema = FrontmatterSchema,
> {
  id: ContentCollectionId;
  connector: MarkdownConnector;
  frontmatterSchema: TSchema;
}
