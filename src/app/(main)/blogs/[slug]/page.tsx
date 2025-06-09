import { MDX_COMPONENTS } from "@/components/mdx-components";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import remarkGfm from 'remark-gfm'
// import rehypeHighlight from 'rehype-highlight'

interface PageProps {
    params: { slug: string }
}




export default async function BlogPage({ params }: PageProps) {
    const post = await getPostBySlug(params.slug)
    console.log(post);
    if (!post) {
        notFound()
      }
    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                {/* <p className="text-gray-600">{post.date}</p> */}
            </header>

            <div className="prose prose-lg max-w-none">
                <MDXRemote
                    source={post.content}
                    components={MDX_COMPONENTS}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            // rehypePlugins: [rehypeHighlight],
                        },
                    }}
                />
            </div>
        </article>
    )

}

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}