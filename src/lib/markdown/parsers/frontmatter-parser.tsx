import matter from "gray-matter";
import { MarkdownParser, ParseContext } from "./types";

export class FrontMatterParser implements MarkdownParser {
  parse<T>(context: ParseContext<T>): ParseContext<T> {
    try {
      const { data } = matter(context.rawContent);

      return {
        ...context,
        frontmatter: data as T,
      };
    } catch {
      // If parsing fails, return context with empty frontmatter
      return {
        ...context,
        frontmatter: {} as T,
      };
    }
  }
}
