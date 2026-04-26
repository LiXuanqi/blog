import { MDX_COMPONENTS } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MarkdownDocument } from "@/lib/content/types";
import { LinkFrontmatter } from "@/lib/content/frontmatter";

interface LinkDetailPageProps {
  link: MarkdownDocument<LinkFrontmatter>;
}

export default function LinkDetailPage({ link }: LinkDetailPageProps) {
  const { frontmatter } = link;

  const tocItems = link.tocItems ?? [];
  const showDraftBanner =
    process.env.NODE_ENV !== "production" && frontmatter.visible === false;

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
            {frontmatter.image && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted mb-6">
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="mb-6">
              <h1 className="mb-4 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                {frontmatter.title}
              </h1>

              {showDraftBanner && (
                <div className="mb-4">
                  <Badge variant="destructive">Draft - not published</Badge>
                </div>
              )}

              {frontmatter.description && (
                <p className="text-lg text-muted-foreground mb-4">
                  {frontmatter.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                {frontmatter.category && (
                  <Badge variant="secondary">{frontmatter.category}</Badge>
                )}
                {frontmatter.date && <span>{frontmatter.date}</span>}
              </div>

              {/* Source banner */}
              {frontmatter.url && (
                <div className="rounded-lg border border-info-border bg-info p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink className="h-4 w-4 text-info-foreground" />
                    <span className="text-info-foreground">Source:</span>
                    <a
                      href={frontmatter.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-link hover:text-link-hover hover:underline"
                    >
                      {frontmatter.url}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Mobile TOC */}
          <TableOfContents items={tocItems} variant="mobile" />

          <div className="max-w-none font-serif">
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
        <aside className="hidden border-l border-border pl-8 lg:block lg:w-64 xl:w-72">
          <div className="sticky top-24 space-y-8">
            {/* Table of Contents */}
            <TableOfContents items={tocItems} variant="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
