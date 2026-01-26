import { BlogFrontmatter } from "./frontmatter";
import { MarkdownCollection } from "./markdown-collection";

/**
 * Type registry for content store - add new types here
 */
export type ContentTypeRegistry = {
  blogs: MarkdownCollection<BlogFrontmatter>;
};
