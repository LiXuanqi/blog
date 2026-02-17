import type { LanguageKey } from "./types.ts";

function detectLanguageFromSlug(slug: string): LanguageKey {
  return slug.endsWith(".zh") ? "zh" : "en";
}

export function withLanguage<
  Input extends {
    slug: string;
  },
>(input: Input): Input & { language: LanguageKey } {
  const language = detectLanguageFromSlug(input.slug);
  return {
    ...input,
    language,
  };
}
