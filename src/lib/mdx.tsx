import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type GitHubRepoConfig } from "./github-api";

const blogsDirectory = path.join(process.cwd(), "content/blogs");
const notesDirectory = path.join(process.cwd(), "content/notes");

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  tags?: string[];
  // Optional fields that may exist in frontmatter
  description?: string; // Used in both blogs and notes
  visible?: boolean; // Used for draft/publish control
  // GitHub integration fields
  source?: "local" | "github";
  repo?: string;
  path?: string;
}

// GitHub repositories configuration - DISABLED
// To re-enable GitHub integration, uncomment the repos below and update the functions
const GITHUB_REPOS: GitHubRepoConfig[] = [
  // DISABLED: Add your repository configurations here
  // Example:
  // {
  //   owner: 'LiXuanqi',
  //   repo: 'posts',
  //   path: 'articles'
  // }
];

async function getLocalPosts(
  directory: string = blogsDirectory,
): Promise<Post[]> {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx?|md)$/, "");
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title,
        date: data.date,
        tags: Array.isArray(data.tags) ? data.tags : [],
        description: data.description,
        visible: data.visible,
        source: "local" as const,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Helper function to filter visible posts
function filterVisiblePosts(posts: Post[]): Post[] {
  return posts.filter((post) => post.visible !== false);
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

export async function getAllPosts(): Promise<Post[]> {
  // DISABLED: GitHub integration - only using local posts
  const localPosts = await getLocalPosts(blogsDirectory);

  // TO RE-ENABLE GITHUB: Uncomment the lines below and comment out the line above
  // const [localPosts, githubPosts] = await Promise.all([
  //   getLocalPosts(blogsDirectory),
  //   fetchPostsFromGitHub(GITHUB_REPOS)
  // ])
  //
  // const allPosts = [
  //   ...localPosts,
  //   ...githubPosts.map(convertGitHubPostToPost)
  // ]
  //
  // return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))

  // Filter out posts that are marked as not visible
  const visiblePosts = filterVisiblePosts(localPosts);
  return visiblePosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllNotes(): Promise<Post[]> {
  const localNotes = await getLocalPosts(notesDirectory);
  // Filter out notes that are marked as not visible
  const visibleNotes = filterVisiblePosts(localNotes);
  return visibleNotes.sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function getLocalPostBySlug(
  slug: string,
  directory: string = blogsDirectory,
): Promise<Post | null> {
  // Try both .mdx and .md extensions
  const extensions = [".mdx", ".md"];

  for (const ext of extensions) {
    try {
      const fullPath = path.join(directory, `${slug}${ext}`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title,
        date: data.date,
        tags: Array.isArray(data.tags) ? data.tags : [],
        description: data.description,
        visible: data.visible,
        source: "local" as const,
      };
    } catch {
      // Continue to next extension
      continue;
    }
  }

  return null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Try blogs first
  const blogPost = await getLocalPostBySlug(slug, blogsDirectory);
  if (blogPost) {
    return blogPost;
  }

  // Try notes
  const notePost = await getLocalPostBySlug(slug, notesDirectory);
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

export async function getNoteBySlug(slug: string): Promise<Post | null> {
  return await getLocalPostBySlug(slug, notesDirectory);
}

// Helper function to add a GitHub repository configuration
export function addGitHubRepo(config: GitHubRepoConfig): void {
  GITHUB_REPOS.push(config);
}

// Helper function to get current GitHub repositories
export function getGitHubRepos(): readonly GitHubRepoConfig[] {
  return GITHUB_REPOS;
}
