import { PageHeader } from "@/components/page-header";
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
    <div className="bg-background">
      <div className="site-page">
        <PageHeader
          title="Links"
          description="Things I’ve read, watched, and found worth keeping."
          details="A personal collection of ideas, talks, courses, and useful tools. Sometimes with my notes and takeaways."
        />

        <LinkEntryList
          posts={links}
          urlPrefix="/links"
          defaultCategory="Link"
        />
      </div>
    </div>
  );
}
