import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fetchPostsFromGitHub, fetchPostBySlugFromGitHub, type GitHubPost, type GitHubRepoConfig } from './github-api'

const blogsDirectory = path.join(process.cwd(), 'content/blogs')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  source?: 'local' | 'github'
  repo?: string
  path?: string
}

// GitHub repositories configuration
const GITHUB_REPOS: GitHubRepoConfig[] = [
  // Add your repository configurations here
  // Example:
  {
    owner: 'LiXuanqi',
    repo: 'posts',
    path: 'articles'
  }
]

async function getLocalPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(blogsDirectory)
  const allPostsData = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(blogsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        source: 'local' as const
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

function convertGitHubPostToPost(githubPost: GitHubPost): Post {
  return {
    slug: githubPost.slug,
    title: githubPost.title,
    date: githubPost.date,
    excerpt: githubPost.excerpt || '',
    content: githubPost.content,
    source: 'github' as const,
    repo: githubPost.repo,
    path: githubPost.path
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const [localPosts, githubPosts] = await Promise.all([
    getLocalPosts(),
    fetchPostsFromGitHub(GITHUB_REPOS)
  ])

  const allPosts = [
    ...localPosts,
    ...githubPosts.map(convertGitHubPostToPost)
  ]

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

async function getLocalPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      source: 'local' as const
    }
  } catch (error) {
    return null
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Try local first
  const localPost = await getLocalPostBySlug(slug)
  if (localPost) {
    return localPost
  }

  // Try GitHub repos
  const githubPost = await fetchPostBySlugFromGitHub(slug, GITHUB_REPOS)
  if (githubPost) {
    return convertGitHubPostToPost(githubPost)
  }

  return null
}

// Helper function to add a GitHub repository configuration
export function addGitHubRepo(config: GitHubRepoConfig): void {
  GITHUB_REPOS.push(config)
}

// Helper function to get current GitHub repositories
export function getGitHubRepos(): readonly GitHubRepoConfig[] {
  return GITHUB_REPOS
}
