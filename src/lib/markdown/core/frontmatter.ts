import z from "zod";

export const BLOG_FRONTMATTER_SCHEMA = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  visible: z.boolean().optional(),
});

export type BlogFrontmatter = z.infer<typeof BLOG_FRONTMATTER_SCHEMA>;

export type BaseFrontmatter = Pick<BlogFrontmatter, "title" | "date">;
