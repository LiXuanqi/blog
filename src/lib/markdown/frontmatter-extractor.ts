import matter from "gray-matter";
import { z } from "zod";
import { MarkdownDocument, RawMarkdownDocument } from "./core/types";

/**
 * Simple frontmatter extractor utility
 */
export class FrontmatterExtractor {
  /**
   * Extract and validate frontmatter from markdown content
   */
  extract<TSchema extends z.ZodTypeAny>(
    rawContent: string,
    schema: TSchema,
  ): z.infer<TSchema> {
    const { data } = matter(rawContent);

    // Convert Date objects to ISO strings for schema validation
    const normalizedData = this.normalizeDateFields(data);

    return schema.parse(normalizedData);
  }

  /**
   * Enrich a raw markdown document with typed frontmatter.
   */
  enrich<TSchema extends z.ZodTypeAny>(
    rawDocument: RawMarkdownDocument,
    schema: TSchema,
  ): MarkdownDocument<z.infer<TSchema>> {
    return {
      ...rawDocument,
      frontmatter: this.extract(rawDocument.content, schema),
    };
  }

  /**
   * Convert Date objects to ISO strings recursively
   */
  private normalizeDateFields(obj: unknown): unknown {
    if (obj instanceof Date) {
      return obj.toISOString().split("T")[0]; // YYYY-MM-DD format
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.normalizeDateFields(item));
    }

    if (obj && typeof obj === "object") {
      const normalized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        normalized[key] = this.normalizeDateFields(value);
      }
      return normalized;
    }

    return obj;
  }
}
