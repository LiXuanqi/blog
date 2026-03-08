import { LanguageKey } from "@/lib/content/types";

export const LOCALES = ["en", "zh"] as const;
export const DEFAULT_LOCALE: LanguageKey = "en";

export function isLocale(value: string): value is LanguageKey {
  return LOCALES.includes(value as (typeof LOCALES)[number]);
}

export function toCanonicalSlug(slug: string, lang: LanguageKey): string {
  if (lang === "zh" && slug.endsWith(".zh")) {
    return slug.slice(0, -3);
  }
  if (lang === "en" && slug.endsWith(".en")) {
    return slug.slice(0, -3);
  }
  return slug;
}
