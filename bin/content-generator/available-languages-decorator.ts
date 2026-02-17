import type { LanguageKey, MarkdownDocument } from "./types.ts";

function normalizeSlug(slug: string, language: LanguageKey): string {
  if (language === "zh") {
    return slug.endsWith(".zh") ? slug.slice(0, -3) : slug;
  }
  return slug.endsWith(".en") ? slug.slice(0, -3) : slug;
}

export function withAvailableLanguages<TDocument extends MarkdownDocument>(
  documents: TDocument[],
): TDocument[] {
  const languageMap = new Map<string, Set<LanguageKey>>();

  for (const document of documents) {
    const baseSlug = normalizeSlug(document.slug, document.language);
    const existingLanguages =
      languageMap.get(baseSlug) ?? new Set<LanguageKey>();
    existingLanguages.add(document.language);
    languageMap.set(baseSlug, existingLanguages);
  }

  return documents.map((document) => {
    const baseSlug = normalizeSlug(document.slug, document.language);
    const allLanguages = Array.from(languageMap.get(baseSlug) ?? []);
    return {
      ...document,
      availableLanguages: allLanguages.filter(
        (language) => language !== document.language,
      ),
    };
  });
}

export function toCanonicalSlug(slug: string, language: LanguageKey): string {
  return normalizeSlug(slug, language);
}
