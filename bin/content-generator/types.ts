import { z } from "zod";

export type LanguageKey = "en" | "zh";
export type ContentCollectionId = "blogs" | "notes" | "links";

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
  source: string;
  sourceId: string;
  language: LanguageKey;
  availableLanguages?: LanguageKey[];
}

export interface MarkdownConnector {
  getAll(): Promise<RawMarkdownDocument[]>;
}

export type FrontmatterSchema = z.ZodTypeAny;

export interface MarkdownSource<
  TSchema extends FrontmatterSchema = FrontmatterSchema,
> {
  id: ContentCollectionId;
  connector: MarkdownConnector;
  frontmatterSchema: TSchema;
}

export type IndexListItem = {
  slug: string;
  title: string;
  date: string;
  language: LanguageKey;
  availableLanguages: LanguageKey[];
};

export type IndexJson = {
  version: 1;
  generatedAt: string;
  collections: Record<
    ContentCollectionId,
    Record<LanguageKey, IndexListItem[]>
  >;
};
