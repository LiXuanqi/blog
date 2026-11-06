import Link from "next/link";
import Image from "next/image";
import { ManifestEntryList } from "@/components/ManifestEntryList";
import { SITE_CONFIG } from "@/lib/site-config";
import { getGeneratedPostListAsync } from "@/lib/generated-content";
import { formatContentDate } from "@/lib/format-content-date";
import HomeHero from "@/components/home-hero";

export default async function Home() {
  const posts = await getGeneratedPostListAsync("posts", "en");
  const featuredPosts = SITE_CONFIG.featuredPostSlugs.flatMap((slug) => {
    const post = posts.find((entry) => entry.slug === slug);
    return post ? [post] : [];
  });
  const [lead, ...rest] = featuredPosts;
  return (
    <div className="site-page">
      <HomeHero />
      {lead && (
        <section aria-label="Featured article" className="mb-12">
          <Link href={`/posts/${lead.slug}`} className="lead-story group">
            {lead.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-auto sm:min-h-64">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 640px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div className="flex flex-col items-start justify-center py-3 sm:py-5">
              <p className="mb-4 text-xs font-medium text-link">
                Featured essay
              </p>
              <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight transition-colors group-hover:text-link sm:text-4xl">
                {lead.title}
              </h2>
              {lead.description && (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {lead.description}
                </p>
              )}
              <time
                dateTime={lead.date}
                className="mt-6 text-xs text-muted-foreground"
              >
                {formatContentDate(lead.date)}
              </time>
            </div>
          </Link>
        </section>
      )}
      <section aria-labelledby="more-writing">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <h2 id="more-writing" className="text-sm font-semibold">
            More writing
          </h2>
          <Link
            href="/posts"
            className="text-sm text-link underline decoration-link/30 underline-offset-4 hover:decoration-link focus-visible:outline-2 focus-visible:outline-ring"
          >
            Browse all posts
          </Link>
        </div>
        <ManifestEntryList posts={rest} urlPrefix="/posts" />
      </section>
    </div>
  );
}
