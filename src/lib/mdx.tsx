import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import { contentStore } from "./markdown/core/content-store";

const blogsDirectory = path.join(process.cwd(), "content/blogs");
const notesDirectory = path.join(process.cwd(), "content/notes");
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

// Helper function to parse filename and extract slug and language
function parseFilename(fileName: string): {
  baseSlug: string;
  language: string;
} {
  const withoutExt = fileName.replace(/\.(mdx?|md)$/, "");
  const parts = withoutExt.split(".");

  if (parts.length >= 2) {
    // Format: slug.lang.ext or slug.part.lang.ext
    const language = parts[parts.length - 1];
    const baseSlug = parts.slice(0, -1).join(".");
    return { baseSlug, language };
  }

  // Fallback: treat as English if no language suffix
  return { baseSlug: withoutExt, language: "en" };
}

// function convertGitHubPostToPost(githubPost: GitHubPost): Post {
//   return {
//     slug: githubPost.slug,
//     title: githubPost.title,
//     date: githubPost.date,
//     excerpt: githubPost.excerpt || '',
//     content: githubPost.content,
//     tags: [], // GitHub posts don't have tags extracted yet
//     source: 'github' as const,
//     repo: githubPost.repo,
//     path: githubPost.path
//   }
// }

async function getLocalPostBySlug(
  slug: string,
  language: string = "en",
  directory: string = blogsDirectory,
): Promise<Post | null> {
  // Try both .mdx and .md extensions
  const extensions = [".mdx", ".md"];

  for (const ext of extensions) {
    // First try with language suffix
    try {
      const fileName = `${slug}.${language}${ext}`;
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Get all available translations for this slug
      const allFiles = fs.readdirSync(directory);
      const translations = allFiles
        .filter((file) => {
          const { baseSlug } = parseFilename(file);
          return baseSlug === slug && file !== fileName;
        })
        .map((file) => parseFilename(file).language);

      return {
        slug,
        language,
        content,
        title: data.title,
        date: data.date,
        tags: Array.isArray(data.tags) ? data.tags : [],
        description: data.description,
        visible: data.visible,
        translations,
        source: "local" as const,
      };
    } catch {
      // If language suffix file not found and we're looking for English, try without suffix
      if (language === "en") {
        try {
          const fileName = `${slug}${ext}`;
          const fullPath = path.join(directory, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          // Get all available translations for this slug
          const allFiles = fs.readdirSync(directory);
          const translations = allFiles
            .filter((file) => {
              const { baseSlug } = parseFilename(file);
              return baseSlug === slug && file !== fileName;
            })
            .map((file) => parseFilename(file).language);

          return {
            slug,
            language: "en", // Treat files without suffix as English
            content,
            title: data.title,
            date: data.date,
            tags: Array.isArray(data.tags) ? data.tags : [],
            description: data.description,
            visible: data.visible,
            translations,
            source: "local" as const,
          };
        } catch {
          // Continue to next extension
          continue;
        }
      }
    }
  }

  return null;
}

export async function getPostBySlug(
  slug: string,
  language: string = "en",
): Promise<Post | null> {
  // Try blogs first
  const blogPost = await getLocalPostBySlug(slug, language, blogsDirectory);
  if (blogPost) {
    return blogPost;
  }

  // Try notes
  const notePost = await getLocalPostBySlug(slug, language, notesDirectory);
  if (notePost) {
    return notePost;
  }

  // DISABLED: GitHub repos lookup
  // TO RE-ENABLE GITHUB: Uncomment the lines below
  // const githubPost = await fetchPostBySlugFromGitHub(slug, GITHUB_REPOS)
  // if (githubPost) {
  //   return convertGitHubPostToPost(githubPost)
  // }

  return null;
}

export async function getNoteBySlug(
  slug: string,
  language: string = "en",
): Promise<Post | null> {
  return await getLocalPostBySlug(slug, language, notesDirectory);
}

// Helper function to get all available languages for a specific post
export async function getAvailableLanguages(
  slug: string,
  directory: string = blogsDirectory,
): Promise<string[]> {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  const languages = fileNames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map(parseFilename)
    .filter(({ baseSlug }) => baseSlug === slug)
    .map(({ language }) => language);

  return [...new Set(languages)];
}

// Links-specific functions
async function getLocalLinks(): Promise<Link[]> {
  if (!fs.existsSync(linksDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(linksDirectory);
  const allLinksData = fileNames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx?|md)$/, "");
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
    });

  return allLinksData
    .filter((link) => link.visible !== false)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllLinks(): Promise<Link[]> {
  return await getLocalLinks();
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
