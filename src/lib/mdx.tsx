import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import { contentStore } from "./markdown/core/content-store";

const linksDirectory = path.join(process.cwd(), "content/links");

export interface Post {
  slug: string; // Base slug without language suffix
  title: string;
  date: string;
  content: string;
  language: string; // Language code (e.g., 'en', 'zh', 'es')
  translations?: string[]; // Available language codes for this post
  tags?: string[];
  // Optional fields that may exist in frontmatter
  description?: string; // Used in both blogs and notes
  visible?: boolean; // Used for draft/publish control
  // GitHub integration fields
  source?: "local" | "github";
  repo?: string;
  path?: string;
}

export interface Link {
  slug: string;
  title: string;
  date: string;
  content: string;
  image?: string;
  url?: string;
  category?: string;
  description?: string;
  visible?: boolean;
}

export async function getLinkBySlug(slug: string): Promise<Link | null> {
  if (!fs.existsSync(linksDirectory)) {
    return null;
  }

  const extensions = [".mdx", ".md"];

  for (const ext of extensions) {
    try {
      const fileName = `${slug}${ext}`;
      const fullPath = path.join(linksDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title,
        date: data.date,
        image: data.image,
        url: data.url,
        category: data.category,
        description: data.description,
        visible: data.visible,
      };
    } catch {
      continue;
    }
  }

  return null;
}
