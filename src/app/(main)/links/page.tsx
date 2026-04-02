import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Hero from "@/components/hero";
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

        <div className="w-full">
          <div className="border-l-2 border-border-muted pl-6 space-y-0">
            {links.map((link) => (
              <LinkItem key={link.slug} link={link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkItem({
  link,
}: {
  link: {
    slug: string;
    title: string;
    date: string;
    description?: string;
    category?: string;
    url?: string;
    directLink?: boolean;
  };
}) {
  const directUrl = link.directLink ? link.url : undefined;
  const isDirectLink = Boolean(directUrl);
  const href = directUrl ?? `/links/${link.slug}`;

  return (
    <Link
      href={href}
      target={isDirectLink ? "_blank" : undefined}
      rel={isDirectLink ? "noopener noreferrer" : undefined}
      className="group block border-b border-border py-3 transition-all duration-200 last:border-b-0 hover:bg-link/5 md:hover:-ml-6 md:hover:-mr-6 md:hover:rounded-r-lg md:hover:pl-6 md:hover:pr-6"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold leading-tight text-foreground transition-colors duration-200 group-hover:text-link">
              {link.title}
            </h3>
            {isDirectLink && (
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-link" />
            )}
          </div>
          {link.description && (
            <p className="text-sm text-muted-foreground">{link.description}</p>
          )}
          {link.category && (
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {link.category}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground md:w-40 md:justify-end">
          {link.date && (
            <time
              dateTime={link.date}
              className="transition-colors duration-200 group-hover:text-foreground"
            >
              {formatDate(link.date)}
            </time>
          )}
          {!link.date && isDirectLink && (
            <span className="transition-colors duration-200 group-hover:text-foreground">
              External
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
