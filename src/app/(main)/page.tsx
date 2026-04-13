import { ManifestEntryList } from "@/components/ManifestEntryList";
import SectionHeader from "@/components/section-header";
import { SITE_CONFIG } from "@/lib/site-config";
import { getGeneratedPostListAsync } from "@/lib/generated-content";
import HomeHero from "@/components/home-hero";

export default async function Home() {
  const articles = await getGeneratedPostListAsync("blogs", "en");
  const notes = await getGeneratedPostListAsync("notes", "en");
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <HomeHero />

        <div className="mx-auto mt-16 max-w-4xl space-y-16">
          <Section>
            <SectionHeader
              title={SITE_CONFIG.sections.articles.title}
              subtitle={SITE_CONFIG.sections.articles.subtitle}
              ctaUrl="/blogs"
            />
            <ManifestEntryList
              posts={articles.slice(0, 3)}
              urlPrefix="/blogs"
            />
          </Section>

          <Section>
            <SectionHeader
              title={SITE_CONFIG.sections.notes.title}
              subtitle={SITE_CONFIG.sections.notes.subtitle}
              ctaUrl="/notes"
            />
            <ManifestEntryList posts={notes.slice(0, 3)} urlPrefix="/notes" />
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
