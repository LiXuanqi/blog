export interface RawMarkdownDocument {
  slug: string;
  content: string;
  source: string;
  sourceId: string;
}

export type LanguageKey = "en" | "zh";

export interface TocItem {
  value: string;
  depth: number;
  url: string;
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
  language: LanguageKey;
  availableLanguages?: LanguageKey[];
  tocItems?: TocItem[];
}
