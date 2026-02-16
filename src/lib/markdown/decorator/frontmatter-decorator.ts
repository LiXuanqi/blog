import matter from "gray-matter";
import z from "zod";

export function withFrontmatter<
  Input extends { content: string },
  TSchema extends z.ZodType,
>(input: Input, schema: TSchema): Input & { frontmatter: z.infer<TSchema> } {
  return {
    ...input,
    ..._extractFrontmatter(input.content, schema),
  };
}

function _extractFrontmatter<TSchema extends z.ZodType>(
  rawContent: string,
  schema: TSchema,
): {
  content: string;
  frontmatter: z.infer<TSchema>;
} {
  const { data, content } = matter(rawContent);

  // Convert Date objects to ISO strings for schema validation
  const normalizedData = _normalizeDateFields(data);

  return {
    content,
    frontmatter: schema.parse(normalizedData),
  };
}

/**
 * Convert Date objects to ISO strings recursively
 */
function _normalizeDateFields(obj: unknown): unknown {
  if (obj instanceof Date) {
    return obj.toISOString().split("T")[0]; // YYYY-MM-DD format
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => _normalizeDateFields(item));
  }

  if (obj && typeof obj === "object") {
    const normalized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      normalized[key] = _normalizeDateFields(value);
    }
    return normalized;
  }

  return obj;
}
