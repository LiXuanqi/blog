import z from "zod";

export const BASE_FRONTMATTER_SCHEMA = z.object({
  title: z.string(),
  date: z.string(),
  visible: z.boolean().default(false),
});

export type BaseFrontmatter = z.infer<typeof BASE_FRONTMATTER_SCHEMA>;

export const BLOG_FRONTMATTER_SCHEMA = BASE_FRONTMATTER_SCHEMA.extend({
  description: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const LINK_FRONTMATTER_SCHEMA = BASE_FRONTMATTER_SCHEMA.extend({
  date: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  url: z.string().optional(),
  category: z.string().optional(),
  directLink: z.boolean().default(false),
}).refine((data) => !data.directLink || Boolean(data.url), {
  message: "Links with directLink=true must define a url",
  path: ["url"],
});
