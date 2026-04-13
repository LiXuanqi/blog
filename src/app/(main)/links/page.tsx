import { Metadata } from "next";
import Hero from "@/components/hero";
import { ManifestEntryList } from "@/components/ManifestEntryList";
import { getGeneratedPostListAsync } from "@/lib/generated-content";

export const metadata: Metadata = {
  title: "Links",
  description: "A curated collection of useful links and resources",
};

export default async function LinksPage() {
  const links = await getGeneratedPostListAsync("links", "en");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Hero
          title="Links"
          content="A curated collection of useful links and resources"
        />

        <ManifestEntryList
          posts={links}
          urlPrefix="/links"
          defaultCategory="Link"
        />
      </div>
    </div>
  );
}
