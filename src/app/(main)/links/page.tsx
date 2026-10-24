import { Metadata } from "next";
import { LinkEntryList } from "@/components/LinkEntryList";
import { getGeneratedPostListAsync } from "@/lib/generated-content";

export const metadata: Metadata = {
  title: "Links",
  description: "Things I’ve read, watched, and found worth keeping.",
};

export default async function LinksPage() {
  const links = await getGeneratedPostListAsync("links", "en");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-10 max-w-2xl">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Links
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Things I’ve read, watched, and found worth keeping.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A personal collection of ideas, talks, courses, and useful tools.
            Sometimes with my notes and takeaways.
          </p>
        </header>

        <LinkEntryList
          posts={links}
          urlPrefix="/links"
          defaultCategory="Link"
        />
      </div>
    </div>
  );
}
