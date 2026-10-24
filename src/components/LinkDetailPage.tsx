import Image from "next/image";
import { formatContentDate } from "@/lib/format-content-date";
import { remarkHeadings } from "@/lib/remark-headings";
import type { TocItem } from "@/lib/toc";
import { MDX_COMPONENTS } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MarkdownDocument } from "@/lib/content/types";
import { LinkFrontmatter } from "@/lib/content/frontmatter";

interface LinkDetailPageProps {
  link: MarkdownDocument<LinkFrontmatter>;
}

export default async function LinkDetailPage({ link }: LinkDetailPageProps) {
  const { frontmatter } = link;

  const tocItems: TocItem[] = [];
  const showDraftBanner =
    process.env.NODE_ENV !== "production" && frontmatter.visible === false;

  const { content } = await compileMDX({
    source: link.content,
    components: MDX_COMPONENTS,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkHeadings(tocItems)],
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
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-8">
      <div className="flex justify-center gap-12">
        <article className="w-full min-w-0 max-w-[680px]">
          <header className="mb-8 border-b border-border pb-8">
            <Link
              href="/links"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Links
            </Link>
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              My notes
            </p>
            <h1 className="font-serif text-3xl font-semibold leading-[1.15] text-balance text-foreground sm:text-[2.5rem]">
              {frontmatter.title}
            </h1>
            {showDraftBanner && (
              <Badge variant="destructive" className="mt-3">
                Draft - not published
              </Badge>
            )}
            {frontmatter.description && (
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {frontmatter.description}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {frontmatter.category && <span>{frontmatter.category}</span>}
              {frontmatter.date && (
                <time dateTime={frontmatter.date}>
                  {formatContentDate(frontmatter.date)}
                </time>
              )}
            </div>
            {frontmatter.url && (
              <a
                href={frontmatter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-link hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                Open original source
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </header>
          {frontmatter.image && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg border border-border">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                sizes="(min-width: 768px) 680px, 100vw"
                className="object-contain"
              />
            </div>
          )}
          <TableOfContents items={tocItems} variant="mobile" />
          <div className="article-content min-w-0 font-sans">{content}</div>
          <footer className="mt-12 border-t border-border pt-6">
            <Link
              href="/links"
              className="inline-flex items-center gap-2 text-sm text-link hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Explore more links
            </Link>
          </footer>
        </article>
        {tocItems.length > 0 && (
          <aside className="hidden w-52 shrink-0 lg:block">
            <div className="sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto">
              <TableOfContents items={tocItems} variant="sidebar" />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
