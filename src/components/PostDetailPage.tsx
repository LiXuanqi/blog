import { MDX_COMPONENTS } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Badge } from "@/components/ui/badge";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeShiki from "@shikijs/rehype";
import rehypeKatex from "rehype-katex";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, CalendarDays } from "lucide-react";
import { MarkdownDocument } from "@/lib/content/types";
import { BlogFrontmatter } from "@/lib/content/frontmatter";

interface PostDetailPageProps {
  post: MarkdownDocument<BlogFrontmatter>;
  locale?: string;
}

export default function PostDetailPage({ post, locale }: PostDetailPageProps) {
  const { frontmatter } = post;
  const tocItems = post.tocItems ?? [];
  const showDraftBanner =
    process.env.NODE_ENV !== "production" && frontmatter.visible === false;
  const formattedDate = formatPostDate(frontmatter.date, locale);
  const readingTime = getReadingTimeLabel(
    post.readingTime,
    post.content,
    locale,
  );

  const backBaseUrl = "/posts";
  const backUrl = locale ? `/${locale}${backBaseUrl}` : backBaseUrl;
  const backText = "Back to Posts";
  const coverImage = frontmatter.image;

  return (
    <div className="max-w-6xl mx-auto px-6 pb-12 pt-8">
      <div className="flex gap-8 lg:gap-12">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <header className="mb-8">
            {/* Back button */}
            <Link
              href={backUrl}
              className="mb-4 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              {backText}
            </Link>

            {coverImage && (
              <div className="relative mb-6 aspect-[3/2] w-full overflow-hidden rounded-2xl border border-border bg-transparent shadow-sm">
                <Image
                  src={coverImage}
                  alt={frontmatter.title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {readingTime}
                </span>
              </div>

              <h1 className="font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                {frontmatter.title}
              </h1>

              {showDraftBanner && (
                <div>
                  <Badge variant="destructive">Draft - not published</Badge>
                </div>
              )}

              {frontmatter.description && (
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  {frontmatter.description}
                </p>
              )}

              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {frontmatter.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Language Switcher */}
              <div className="pt-1">
                <LanguageSwitcher
                  currentLanguage={post.language}
                  availableLanguages={post.availableLanguages || []}
                />
              </div>
            </div>
          </header>

          {/* Mobile TOC */}
          <TableOfContents items={tocItems} variant="mobile" />

          <div className="max-w-none font-serif">
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
                            pre(node: { properties: Record<string, unknown> }) {
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

function formatPostDate(date: string, locale?: string): string {
  const formatterLocale = locale === "zh" ? "zh-CN" : "en-US";

  return new Date(date).toLocaleDateString(formatterLocale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getReadingTimeLabel(
  readingTime: number | undefined,
  content: string,
  locale?: string,
): string {
  const minutes = readingTime ?? estimateReadingTimeMinutes(content);

  if (locale === "zh") {
    return `${minutes} 分钟阅读`;
  }

  return `${minutes} min read`;
}

function estimateReadingTimeMinutes(content: string): number {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}
