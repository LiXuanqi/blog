import { MDX_COMPONENTS } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeShiki from '@shikijs/rehype'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

interface PostDetailPageProps {
    post: Post
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <article className="lg:col-span-3">
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
                                    // Github markdown flavor + math support
                                    remarkPlugins: [remarkGfm, remarkMath],
                                    rehypePlugins: [
                                        // Math rendering
                                        rehypeKatex,
                                        // Code highlight
                                        [rehypeShiki, {
                                            themes: {
                                                light: 'github-light',
                                                dark: 'github-dark'
                                            },
                                            langs: [
                                                'javascript',
                                                'typescript',
                                                'jsx',
                                                'tsx',
                                                'css',
                                                'html',
                                                'json',
                                                'markdown',
                                                'bash',
                                                'python',
                                                'go',
                                                'rust',
                                                'java'
                                            ],
                                            inline: 'tailing-curly-colon',
                                        }]
                                    ],
                                },
                            }}
                        />
                    </div>
                </article>

                {/* Right Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-8">
                        {post.tags && post.tags.length > 0 && (
                            <div className="bg-card border rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4 text-foreground">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    )
}