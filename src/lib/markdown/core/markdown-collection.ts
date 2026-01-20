import { MarkdownDocument } from "./types";

export type MarkdownCollection<TFrontmatter = Record<string, unknown>> = {
  getList(): Pick<MarkdownDocument<TFrontmatter>, "slug">[];
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
        });
      }
      return ret;
    },
  };
}
