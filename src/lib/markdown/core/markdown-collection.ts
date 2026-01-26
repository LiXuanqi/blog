import { BaseFrontmatter } from "./frontmatter";
import { MarkdownDocument } from "./types";

export type MarkdownCollection<TFrontmatter extends BaseFrontmatter> = {
  getList(): { slug: string; title: string; date: string }[];
  getItemBySlug(slug: string): {
    frontmatter: TFrontmatter;
  };
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
    getItemBySlug: () => {
      return {
        frontmatter: {
          title: "test",
          date: "test",
          description: "a",
          tags: [],
          visible: true,
        },
      };
    },
  };
}
