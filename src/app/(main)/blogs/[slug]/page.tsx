import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

interface PageProps {
    params: { slug: string }
}

// Custom components for MDX
const components = {
    h1: ({ children, ...props }: any) => (
        <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: any) => (
        <h2 className="text-2xl font-semibold mt-6 mb-3" {...props}>
            {children}
        </h2>
    ),
    p: ({ children, ...props }: any) => (
        <p className="mb-4 leading-relaxed" {...props}>
            {children}
        </p>
    ),
    code: ({ children, ...props }: any) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
            {children}
        </code>
    ),
    pre: ({ children, ...props }: any) => (
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4" {...props}>
            {children}
        </pre>
    ),
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
                    components={components}
                    options={{
                        mdxOptions: {
                            // remarkPlugins: [remarkGfm],
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