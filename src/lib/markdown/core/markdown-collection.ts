import { MarkdownDocument } from "./types";

export type MarkdownCollection = {
  getList(): Pick<MarkdownDocument, "slug">[];
};

export function makeMarkdownCollection(
  markdownFiles: MarkdownDocument[],
): MarkdownCollection {
  return {
    getList: () => {
      const ret = [];
      for (const files of markdownFiles) {
        ret.push({
          slug: files.slug,
        });
      }
      return ret;
    },
  };
}
