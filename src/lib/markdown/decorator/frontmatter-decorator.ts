import matter from "gray-matter";
import z from "zod";

export function withFrontmatter<
  Input extends { content: string },
  TSchema extends z.ZodType,
>(input: Input, schema: TSchema): Input & { frontmatter: z.infer<TSchema> } {
  return {
    ...input,
    frontmatter: _extractFrontmatter(input.content, schema),
  };
}

function _extractFrontmatter<TSchema extends z.ZodType>(
  content: string,
  schema: TSchema,
): z.infer<TSchema> {
  const { data } = matter(content);

  // Convert Date objects to ISO strings for schema validation
  const normalizedData = _normalizeDateFields(data);

  return schema.parse(normalizedData);
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
