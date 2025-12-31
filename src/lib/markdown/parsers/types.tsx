import { z } from "zod";

export interface ParseContext<T = Record<string, unknown>> {
  slug: string;
  source: string;
  rawContent: string;
  frontmatter?: T;
  schema: z.ZodSchema;
}

export interface MarkdownParser {
  parse<T>(context: ParseContext<T>): ParseContext<T>;
}
