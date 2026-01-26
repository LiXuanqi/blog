import { LanguageKey } from "../core/types";

function _detectLanguageFromSlug(slug: string): LanguageKey {
  return slug.endsWith(".zh") ? "zh" : "en";
}

export function withLanguage<
  Input extends {
    slug: string;
  },
>(input: Input): Input & { language: LanguageKey } {
  const language = _detectLanguageFromSlug(input.slug);
  return {
    ...input,
    language,
  };
}
