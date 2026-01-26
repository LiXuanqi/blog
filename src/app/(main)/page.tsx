import Hero from "@/components/hero";
import { PostList } from "@/components/post-list";
import SectionHeader from "@/components/section-header";
import { getAllNotes } from "@/lib/mdx";
import { SITE_CONFIG } from "@/lib/site-config";
import Image from "next/image";
import { getContentStoreAsync } from "@/lib/markdown/core/content-store";

export default async function Home() {
  const contentStore = await getContentStoreAsync();
  const articles = contentStore.get("blogs")?.getList() ?? [];
  const notes = await getAllNotes("en");
  return (
    // TODO: same layout as blogs home page
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* About me section */}
        <div className="flex gap-6">
          <div className="w-2/3">
            <Hero
              title={`Hey, I'm ${SITE_CONFIG.name}!`}
              content={SITE_CONFIG.description}
            />
          </div>
          <div className="w-1/3">
            <Image
              src={SITE_CONFIG.assets.profileImage}
              width={500}
              height={500}
              alt={`Picture of ${SITE_CONFIG.name}`}
            />
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <Section>
            <SectionHeader
              title={SITE_CONFIG.sections.notes.title}
              subtitle={SITE_CONFIG.sections.notes.subtitle}
              ctaUrl="/notes"
            />
            <PostList posts={notes} limit={3} urlPrefix="/notes" />
          </Section>

          <Section>
            <SectionHeader
              title={SITE_CONFIG.sections.articles.title}
              subtitle={SITE_CONFIG.sections.articles.subtitle}
              ctaUrl="/blogs"
            />
            <PostList posts={articles} limit={3} />
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
