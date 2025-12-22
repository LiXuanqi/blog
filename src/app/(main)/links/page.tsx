import { Metadata } from "next";
import Link from "next/link";
import { getAllLinks, type Link as LinkType } from "@/lib/mdx";
import Hero from "@/components/hero";

export const metadata: Metadata = {
  title: "Links",
  description: "A curated collection of useful links and resources",
};

export default async function LinksPage() {
  const links = await getAllLinks();

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

function LinkItem({ link }: { link: LinkType }) {
  return (
    <Link href={`/links/${link.slug}`} passHref>
      <div className="group block py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 md:hover:-ml-6 md:hover:-mr-6 md:hover:pl-6 md:hover:pr-6 md:hover:rounded-r-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {link.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 md:w-40 md:justify-end">
            {link.date && (
              <time
                dateTime={link.date}
                className="group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200"
              >
                {formatDate(link.date)}
              </time>
            )}
          </div>
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
