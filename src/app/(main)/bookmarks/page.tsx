import { SvglIcon } from "@/components/icons/bookmark-icons";

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

      <div className="space-y-4">
        {bookmarks.map((bookmark, index) => (
          <BookmarkItem key={index} bookmark={bookmark} />
        ))}
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
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className="flex-shrink-0 group-hover:scale-110 transition-transform">
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
              {bookmark.title}
            </h3>
            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              ↗
            </span>
          </div>
          {bookmark.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {bookmark.description}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}
