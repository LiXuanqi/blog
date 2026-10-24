import { ManifestEntryList } from "@/components/ManifestEntryList";
import SectionHeader from "@/components/section-header";
import { SITE_CONFIG } from "@/lib/site-config";
import { getGeneratedPostListAsync } from "@/lib/generated-content";
import HomeHero from "@/components/home-hero";

export default async function Home() {
  const posts = await getGeneratedPostListAsync("posts", "en");
  const featuredPosts = SITE_CONFIG.featuredPostSlugs.flatMap((slug) => {
    const post = posts.find((entry) => entry.slug === slug);
    return post ? [post] : [];
  });
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <HomeHero />

        <div className="mx-auto mt-6 max-w-4xl space-y-10 sm:mt-8">
          <Section>
            <SectionHeader
              title={SITE_CONFIG.sections.blog.title}
              subtitle={SITE_CONFIG.sections.blog.subtitle}
              ctaUrl="/posts"
            />
            <ManifestEntryList posts={featuredPosts} urlPrefix="/posts" />
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
