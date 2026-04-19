import { z } from "zod";

export type LanguageKey = "en" | "zh";
export type ContentCollectionId = "posts" | "links";
export interface TocItem {
  value: string;
  depth: number;
  url: string;
}

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
  tocItems?: TocItem[];
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

export interface PipelineDocument {
  slug: string;
  content: string;
  source: string;
  sourceId: string;
  frontmatter?: Record<string, unknown>;
  language?: LanguageKey;
  availableLanguages?: LanguageKey[];
  tocItems?: TocItem[];
}

export interface DocumentPlugin {
  name: string;
  apply(
    document: PipelineDocument,
  ): Promise<PipelineDocument> | PipelineDocument;
}

export interface CollectionPlugin {
  name: string;
  apply(
    documents: PipelineDocument[],
  ): Promise<PipelineDocument[]> | PipelineDocument[];
}

export interface CollectionEmitter {
  name: string;
  emit(
    collection: GeneratedCollection,
    outputDir: string,
  ): Promise<IndexListItem[]> | IndexListItem[];
}

export interface CollectionConfig {
  id: ContentCollectionId;
  loader: MarkdownConnector;
  documentPlugins: DocumentPlugin[];
  collectionPlugins: CollectionPlugin[];
  emitter: CollectionEmitter;
}

export interface GeneratedCollection {
  id: ContentCollectionId;
  documents: MarkdownDocument<Record<string, unknown>>[];
}

export type IndexListItem = {
  slug: string;
  title: string;
  date: string;
  language: LanguageKey;
  availableLanguages: LanguageKey[];
  description?: string;
  image?: string;
  tags?: string[];
  category?: string;
  url?: string;
  directLink?: boolean;
};

export type IndexJson = {
  version: 1;
  generatedAt: string;
  collections: Record<
    ContentCollectionId,
    Record<LanguageKey, IndexListItem[]>
  >;
};
