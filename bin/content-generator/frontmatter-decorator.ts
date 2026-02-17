import matter from "gray-matter";
import z from "zod";

export function withFrontmatter<
  Input extends { content: string },
  TSchema extends z.ZodType,
>(input: Input, schema: TSchema): Input & { frontmatter: z.infer<TSchema> } {
  return {
    ...input,
    ...extractFrontmatter(input.content, schema),
  };
}

function extractFrontmatter<TSchema extends z.ZodType>(
  rawContent: string,
  schema: TSchema,
): {
  content: string;
  frontmatter: z.infer<TSchema>;
} {
  const { data, content } = matter(rawContent);
  const normalizedData = normalizeDateFields(data);

  return {
    content,
    frontmatter: schema.parse(normalizedData),
  };
}

function normalizeDateFields(obj: unknown): unknown {
  if (obj instanceof Date) {
    return obj.toISOString().split("T")[0];
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeDateFields(item));
  }

  if (obj && typeof obj === "object") {
    const normalized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      normalized[key] = normalizeDateFields(value);
    }
    return normalized;
  }

  return obj;
}
