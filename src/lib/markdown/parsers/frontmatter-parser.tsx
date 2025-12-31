import matter from "gray-matter";
import { MarkdownParser, ParseContext } from "./types";

export class FrontMatterParser implements MarkdownParser {
  parse<T>(context: ParseContext<T>): ParseContext<T> {
    try {
      const { data } = matter(context.rawContent);

      // Apply schema validation
      const result = context.schema.safeParse(data);
      const validatedData = result.success ? (result.data as T) : ({} as T);

      return {
        ...context,
        frontmatter: validatedData,
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
