import Link from "next/link";
import Image from "next/image";
import type { PostPreview } from "@/components/post-preview";
import { formatContentDate } from "@/lib/format-content-date";

type ManifestEntryPreview = PostPreview & {
  url?: string;
  directLink?: boolean;
};
interface ManifestEntryListProps {
  posts: ReadonlyArray<ManifestEntryPreview>;
  urlPrefix?: string;
  defaultCategory?: string;
}

export function ManifestEntryList({
  posts,
  urlPrefix = "/posts",
  defaultCategory,
}: ManifestEntryListProps) {
  return (
    <ul className="divide-y divide-border/70">
      {posts.map((post) => {
        const href =
          (post.directLink && post.url) || `${urlPrefix}/${post.slug}`;
        const external = /^https?:\/\//.test(href);
        const category =
          post.tags?.join(" / ") || post.category || defaultCategory;
        return (
          <li key={post.slug}>
            <Link
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={`group grid items-center gap-5 rounded-sm py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:gap-8 sm:py-8 ${post.image ? "sm:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]" : ""}`}
            >
              {post.image && (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 240px, calc(100vw - 48px)"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <time
                  dateTime={post.date}
                  className="text-xs leading-6 text-muted-foreground"
                >
                  {formatContentDate(post.date)}
                </time>
                <h2 className="mt-2 text-xl font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-link sm:text-2xl">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {post.description}
                  </p>
                )}
                {category && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    {category}
                  </p>
                )}
                {external && (
                  <span className="sr-only">Opens in a new tab</span>
                )}
              </div>
            </Link>
          </li>
        );
      })}
      {posts.length === 0 && (
        <li className="py-10 text-muted-foreground">No posts published yet.</li>
      )}
    </ul>
  );
}
