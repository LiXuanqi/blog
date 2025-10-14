import Link from "next/link";
import { SvglIcon } from "@/components/icons/bookmark-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Hero from "@/components/hero";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

interface Bookmark {
  title: string;
  url: string;
  icon?: string;
  description?: string;
}

interface BookmarkSection {
  title: string;
  description?: string;
  bookmarks: Bookmark[];
}

type BookmarksData = {
  sections: BookmarkSection[];
};

async function getBookmarks(): Promise<BookmarkSection[]> {
  const bookmarksPath = path.join(process.cwd(), "content", "bookmarks.yaml");
  const fileContents = fs.readFileSync(bookmarksPath, "utf8");
  const data = yaml.load(fileContents) as BookmarksData;
  return data.sections;
}

export default async function BookmarksPage() {
  const bookmarkSections = await getBookmarks();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <Hero
          title="Bookmarks"
          content="A curated collection of useful development resources and tools."
        />

        <div className="space-y-12">
          {bookmarkSections.map((section, sectionIndex) => (
            <section key={sectionIndex}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-muted-foreground text-sm">
                    {section.description}
                  </p>
                )}
              </div>

              <ul className="space-y-2">
                {section.bookmarks.map((bookmark, bookmarkIndex) => (
                  <li key={bookmarkIndex}>
                    <BookmarkItem bookmark={bookmark} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  const getIcon = (iconName?: string) => {
    if (!iconName) return null;

    switch (iconName) {
      case "svgl":
        return <SvglIcon />;
      default:
        return null;
    }
  };

  const icon = getIcon(bookmark.icon);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block py-1 text-primary hover:underline"
        >
          <div className="flex">
            {icon && <div className="flex-shrink-0 mt-0.5 pr-2">{icon}</div>}
            {bookmark.title}
          </div>
        </Link>
      </HoverCardTrigger>
      {(bookmark.description || bookmark.url) && (
        <HoverCardContent className="w-80" align="start" sideOffset={8}>
          <Link
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 hover:bg-muted/20 rounded p-1 -m-1 transition-colors block"
          >
            {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
            <div className="flex-1 space-y-1">
              {bookmark.description && (
                <p className="text-sm text-foreground">
                  {bookmark.description}
                </p>
              )}
              <p className="text-xs text-primary font-mono break-all">
                {bookmark.url}
              </p>
            </div>
          </Link>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
