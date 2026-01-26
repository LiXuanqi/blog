import { BaseFrontmatter } from "./frontmatter";
import { MarkdownDocument } from "./types";

export type MarkdownCollection<TFrontmatter extends BaseFrontmatter> = {
  getList(): { slug: string; title: string; date: string }[];
  getItemBySlug(slug: string): MarkdownDocument<TFrontmatter> | null;
};

export function makeMarkdownCollection<TFrontmatter extends BaseFrontmatter>(
  markdownFiles: MarkdownDocument<TFrontmatter>[],
): MarkdownCollection<TFrontmatter> {
  return {
    getList: () => {
      const ret = [];
      for (const file of markdownFiles) {
        ret.push({
          slug: file.slug,
          title: file.frontmatter.title,
          date: file.frontmatter.date,
        });
      }
      return ret;
    },
    getItemBySlug: (slug) =>
      markdownFiles.find((file) => file.slug === slug) ?? null,
  };
}
