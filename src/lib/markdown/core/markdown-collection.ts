import { BaseFrontmatter } from "./frontmatter";
import { LanguageKey, MarkdownDocument } from "./types";

export type MarkdownCollection<TFrontmatter extends BaseFrontmatter> = {
  getList(language?: LanguageKey): {
    slug: string;
    title: string;
    date: string;
    language: LanguageKey;
  }[];
  getItemBySlug(
    slug: string,
    lang?: LanguageKey,
  ): MarkdownDocument<TFrontmatter> | null;
};

export function makeMarkdownCollection<TFrontmatter extends BaseFrontmatter>(
  markdownFiles: MarkdownDocument<TFrontmatter>[],
): MarkdownCollection<TFrontmatter> {
  // TODO: Revisit slug normalization; ideally slugs are canonicalized during ingestion,
  // so collection lookup can compare raw slug + language without runtime normalization.
  const normalizeSlug = (slug: string, language: LanguageKey): string => {
    if (language === "zh") {
      return slug.endsWith(".zh") ? slug.slice(0, -3) : slug;
    }
    return slug.endsWith(".en") ? slug.slice(0, -3) : slug;
  };

  return {
    getList: (language) => {
      const ret = [];
      for (const file of markdownFiles) {
        if (language !== undefined && file.language !== language) {
          continue;
        }
        ret.push({
          slug: file.slug,
          title: file.frontmatter.title,
          date: file.frontmatter.date,
          language: file.language,
        });
      }
      return ret;
    },
    getItemBySlug: (slug, lang = "en") => {
      const normalizedTargetSlug = normalizeSlug(slug, lang);
      return (
        markdownFiles.find(
          (file) =>
            file.language === lang &&
            normalizeSlug(file.slug, file.language) === normalizedTargetSlug,
        ) ?? null
      );
    },
  };
}
