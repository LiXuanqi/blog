import { LanguageKey } from "./core/types";

export function enrichLanguage(input: { slug: string; language: string }) {
  const language = _detectLanguageFromSlug(input.slug);
  input.language = language;
}

function _detectLanguageFromSlug(slug: string): LanguageKey {
  return slug.endsWith(".zh") ? "zh" : "en";
}
