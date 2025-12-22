import { MDX_COMPONENTS } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Link } from "@/lib/mdx";
import { extractTocFromMarkdown, processTocItems } from "@/lib/toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface LinkDetailPageProps {
  link: Link;
}

export default function LinkDetailPage({ link }: LinkDetailPageProps) {
  // Extract TOC from markdown content
  const tocItems = processTocItems(extractTocFromMarkdown(link.content));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex gap-8 lg:gap-12">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <header className="mb-12">
            {/* Back button */}
            <Link
              href="/links"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Links
            </Link>

            {/* Link image */}
            {link.image && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted mb-6">
                <Image
                  src={link.image}
                  alt={link.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {link.title}
                </h1>

                {link.description && (
                  <p className="text-lg text-muted-foreground mb-4">
                    {link.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {link.category && (
                    <Badge variant="secondary">{link.category}</Badge>
                  )}
                  {link.date && <span>{link.date}</span>}
                </div>
              </div>

              {/* Visit link button */}
              {link.url && (
                <Button asChild className="shrink-0">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Visit Link
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </header>

          {/* Mobile TOC */}
          <TableOfContents items={tocItems} variant="mobile" />

          <div className="max-w-none">
            <MDXRemote
              source={link.content}
              components={MDX_COMPONENTS}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
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
            {/* Link metadata */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Link Details
              </h3>
              <div className="space-y-2 text-sm">
                {link.category && (
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <span className="ml-2 font-medium">{link.category}</span>
                  </div>
                )}
                {link.date && (
                  <div>
                    <span className="text-muted-foreground">Added:</span>
                    <span className="ml-2 font-medium">{link.date}</span>
                  </div>
                )}
                {link.url && (
                  <div>
                    <span className="text-muted-foreground">URL:</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 font-medium text-primary hover:underline break-all"
                    >
                      {new URL(link.url).hostname}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Table of Contents */}
            <TableOfContents items={tocItems} variant="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
