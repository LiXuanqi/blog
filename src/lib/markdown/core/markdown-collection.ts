import { MarkdownDocument } from "./types";

export type MarkdownCollection<TFrontmatter = Record<string, unknown>> = {
  getList(): Pick<MarkdownDocument<TFrontmatter>, "slug" | "title" | "date">[];
};

export function makeMarkdownCollection<TFrontmatter = Record<string, unknown>>(
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
  };
}
