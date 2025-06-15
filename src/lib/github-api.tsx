import { Octokit } from '@octokit/rest'
import matter from 'gray-matter'

export interface GitHubPost {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  source: 'github'
  repo: string
  path: string
}

export interface GitHubRepoConfig {
  owner: string
  repo: string
  path?: string // Path within repo to look for files (e.g., 'content', 'posts')
  branch?: string // Default: 'main'
  token?: string // GitHub personal access token for private repos
}

class GitHubAPI {
  private octokit: Octokit

  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token,
    })
  }

  async getRepositoryFiles(config: GitHubRepoConfig) {
    const { owner, repo, path = '', branch = 'main' } = config
    
    try {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      })

      if (!Array.isArray(data)) {
        return []
      }

      return data.filter(
        (file): file is typeof file & { type: 'file'; download_url: string } =>
          file.type === 'file' &&
          file.download_url !== null &&
          (file.name.endsWith('.md') || file.name.endsWith('.mdx'))
      )
    } catch (error) {
      console.error(`Failed to fetch files from ${owner}/${repo}:`, error)
      return []
    }
  }

  async getFileContent(downloadUrl: string): Promise<string> {
    try {
      const response = await fetch(downloadUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
      }
      return await response.text()
    } catch (error) {
      console.error('Failed to fetch file content:', error)
      throw error
    }
  }

  async getAllMarkdownFiles(config: GitHubRepoConfig): Promise<GitHubPost[]> {
    try {
      const files = await this.getRepositoryFiles(config)
      const posts: GitHubPost[] = []

      for (const file of files) {
        try {
          const content = await this.getFileContent(file.download_url)
          const { data, content: markdownContent } = matter(content)
          
          // Extract slug from filename
          const slug = file.name.replace(/\.(md|mdx)$/, '')
          
          posts.push({
            slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString().split('T')[0],
            excerpt: data.excerpt,
            content: markdownContent,
            source: 'github',
            repo: `${config.owner}/${config.repo}`,
            path: file.path
          })
        } catch (error) {
          console.warn(`Failed to process file ${file.name}:`, error)
          continue
        }
      }

      return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
    } catch (error) {
      console.error('Failed to fetch posts from GitHub:', error)
      return []
    }
  }

  async getPostBySlug(slug: string, config: GitHubRepoConfig): Promise<GitHubPost | null> {
    try {
      const files = await this.getRepositoryFiles(config)
      const file = files.find(f => 
        f.name === `${slug}.md` || f.name === `${slug}.mdx`
      )
      
      if (!file) {
        return null
      }

      const content = await this.getFileContent(file.download_url)
      const { data, content: markdownContent } = matter(content)
      
      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt,
        content: markdownContent,
        source: 'github',
        repo: `${config.owner}/${config.repo}`,
        path: file.path
      }
    } catch (error) {
      console.error(`Failed to fetch post ${slug} from GitHub:`, error)
      return null
    }
  }

  async searchMarkdownFiles(
    config: GitHubRepoConfig, 
    query: string
  ): Promise<GitHubPost[]> {
    try {
      const { owner, repo } = config
      const searchQuery = `${query} repo:${owner}/${repo} extension:md extension:mdx`
      
      const { data } = await this.octokit.rest.search.code({
        q: searchQuery,
      })
      
      const posts: GitHubPost[] = []
      
      for (const item of data.items) {
        try {
          const content = await this.getFileContent(item.html_url.replace('/blob/', '/raw/'))
          const { data: frontmatter, content: markdownContent } = matter(content)
          const slug = item.name.replace(/\.(md|mdx)$/, '')
          
          posts.push({
            slug,
            title: frontmatter.title || slug,
            date: frontmatter.date || new Date().toISOString().split('T')[0],
            excerpt: frontmatter.excerpt,
            content: markdownContent,
            source: 'github',
            repo: `${owner}/${repo}`,
            path: item.path
          })
        } catch (error) {
          console.warn(`Failed to process search result ${item.name}:`, error)
          continue
        }
      }

      return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
    } catch (error) {
      console.error('Failed to search posts from GitHub:', error)
      return []
    }
  }
}

// Create singleton instance
let githubAPI: GitHubAPI

export function createGitHubAPI(token?: string): GitHubAPI {
  if (!githubAPI) {
    githubAPI = new GitHubAPI(token)
  }
  return githubAPI
}

export function getGitHubAPI(): GitHubAPI {
  if (!githubAPI) {
    githubAPI = new GitHubAPI(process.env.GITHUB_TOKEN)
  }
  return githubAPI
}

// Helper functions for common use cases
export async function fetchPostsFromGitHub(
  repos: GitHubRepoConfig[]
): Promise<GitHubPost[]> {
  const api = getGitHubAPI()
  const allPosts: GitHubPost[] = []
  
  for (const repo of repos) {
    const posts = await api.getAllMarkdownFiles(repo)
    allPosts.push(...posts)
  }
  
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function fetchPostBySlugFromGitHub(
  slug: string,
  repos: GitHubRepoConfig[]
): Promise<GitHubPost | null> {
  const api = getGitHubAPI()
  
  for (const repo of repos) {
    const post = await api.getPostBySlug(slug, repo)
    if (post) {
      return post
    }
  }
  return null
}