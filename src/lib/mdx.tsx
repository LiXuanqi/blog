import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogsDirectory = path.join(process.cwd(), 'content/blogs')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

export async function getAllPosts(): Promise<Post[]> {
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
        excerpt: data.excerpt
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt
    }
  } catch (error) {
    return null
  }
}
