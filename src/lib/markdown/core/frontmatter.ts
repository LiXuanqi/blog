import z from "zod";

export const BASE_FRONTMATTER_SCHEMA = z.object({
  title: z.string(),
  date: z.string(),
  visible: z.boolean().default(false),
});

export type BaseFrontmatter = z.infer<typeof BASE_FRONTMATTER_SCHEMA>;

export const BLOG_FRONTMATTER_SCHEMA = BASE_FRONTMATTER_SCHEMA.extend({
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type BlogFrontmatter = z.infer<typeof BLOG_FRONTMATTER_SCHEMA>;

export const NOTE_FRONTMATTER_SCHEMA = BASE_FRONTMATTER_SCHEMA.extend({
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  testField: z.string().optional(),
});

export type NoteFrontmatter = z.infer<typeof NOTE_FRONTMATTER_SCHEMA>;
