import { MDX_COMPONENTS } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/lib/mdx";
import { extractTocFromMarkdown, processTocItems } from "@/lib/toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeShiki from "@shikijs/rehype";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface PostDetailPageProps {
  post: Post;
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
  // Extract TOC from markdown content
  const tocItems = processTocItems(extractTocFromMarkdown(post.content));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-6 lg:gap-8">
        {/* Main Content */}
        <article className="flex-1 lg:max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            {/* <p className="text-gray-600">{post.date}</p> */}
          </header>

          {/* Mobile TOC */}
          <TableOfContents items={tocItems} variant="mobile" />

          <div className="prose prose-lg max-w-none dark:prose-invert">
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
                    [
                      rehypeShiki,
                      {
                        themes: {
                          light: "github-light",
                          dark: "github-dark",
                        },
                        langs: [
                          "javascript",
                          "typescript",
                          "jsx",
                          "tsx",
                          "css",
                          "html",
                          "json",
                          "markdown",
                          "bash",
                          "python",
                          "go",
                          "rust",
                          "java",
                        ],
                        inline: "tailing-curly-colon",
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </article>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:w-64 xl:w-72 border-l border-border pl-6 lg:pl-8">
          <div className="sticky top-24 space-y-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Table of Contents */}
            <TableOfContents items={tocItems} variant="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
