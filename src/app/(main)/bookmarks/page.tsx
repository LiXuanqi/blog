import Link from "next/link";
import { SvglIcon } from "@/components/icons/bookmark-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Bookmark {
  title: string;
  url: string;
  icon?: string;
  description?: string;
}

const bookmarks: Bookmark[] = [
  {
    title: "svgl",
    url: "https://svgl.app",
    icon: "svgl",
    description: "SVG logos",
  },
  {
    title: "transform",
    url: "https://transform.tools/",
    description: "Transform data",
  },
];

export default function BookmarksPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Bookmarks</h1>
        <p className="text-muted-foreground">
          A curated collection of useful development resources and tools.
        </p>
      </div>

      <ul className="space-y-1">
        {bookmarks.map((bookmark, index) => (
          <li key={index}>
            <BookmarkItem bookmark={bookmark} />
          </li>
        ))}
      </ul>
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
        <HoverCardContent className="w-80">
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
