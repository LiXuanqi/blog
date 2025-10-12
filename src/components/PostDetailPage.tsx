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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex gap-8 lg:gap-12">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>
            {/* <p className="text-gray-600">{post.date}</p> */}
          </header>

          {/* Mobile TOC */}
          <TableOfContents items={tocItems} variant="mobile" />

          <div className="max-w-none">
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
                          "yaml",
                          "sql",
                          "dockerfile",
                        ],
                        inline: "tailing-curly-colon",
                        transformers: [
                          {
                            name: "add-copy-button",
                            pre(node) {
                              // Add data attributes for copy functionality
                              node.properties["data-code-block"] = true;
                            },
                          },
                        ],
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </article>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:w-64 xl:w-72 border-l border-gray-200 dark:border-gray-700 pl-8">
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
