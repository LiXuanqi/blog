import Link from "next/link";
import { ExternalLink, Globe } from "lucide-react";
import type { PostPreview } from "@/components/post-preview";
import { Badge } from "@/components/ui/badge";

type LinkEntryPreview = PostPreview & {
  url?: string;
  directLink?: boolean;
};

interface LinkEntryListProps {
  posts: ReadonlyArray<LinkEntryPreview>;
  urlPrefix?: string;
  defaultCategory?: string;
}

export function LinkEntryList({
  posts,
  urlPrefix = "/links",
  defaultCategory = "Link",
}: LinkEntryListProps) {
  return (
    <div className="space-y-3">
      {posts.map((post) => {
        const href = post.directLink ? post.url : `${urlPrefix}/${post.slug}`;
        if (!href) {
          return null;
        }

        const isExternal =
          href.startsWith("http://") || href.startsWith("https://");
        const hostname = post.url ? getHostname(post.url) : undefined;
        const category = post.category ?? post.tags?.[0] ?? defaultCategory;

        return (
          <Link
            key={href}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <article className="rounded-2xl border border-border/80 bg-card px-4 py-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-link/25 group-hover:shadow-lg sm:px-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{category}</Badge>
                    {hostname && (
                      <span className="inline-flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5" />
                        {hostname}
                      </span>
                    )}
                    {post.date && <span>{formatDate(post.date)}</span>}
                  </div>

                  <h2 className="text-base font-semibold leading-tight text-foreground sm:text-lg">
                    {post.title}
                  </h2>

                  {post.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                </div>

                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors group-hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                </span>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}

function getHostname(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
