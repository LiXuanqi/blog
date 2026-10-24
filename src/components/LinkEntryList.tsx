"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getLinkPreviewImage } from "@/lib/link-preview";
import { ArrowUpRight, NotebookPen } from "lucide-react";
import { formatContentDate } from "@/lib/format-content-date";

type LinkEntryPreview = {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  date?: string;
  category?: string;
  url?: string;
  hasNotes?: boolean;
};

interface LinkEntryListProps {
  posts: ReadonlyArray<LinkEntryPreview>;
  urlPrefix?: string;
  defaultCategory?: string;
}

export function LinkEntryList({
  posts,
  urlPrefix = "/links",
  defaultCategory = "Link",
}: LinkEntryListProps) {
  const [notesOnly, setNotesOnly] = useState(false);
  const notesCount = posts.filter((post) => post.hasNotes).length;
  const entries = posts.filter((post) => !notesOnly || post.hasNotes);
  return (
    <section aria-label="Saved links">
      <div
        className="mb-1 flex flex-wrap items-center gap-2 border-b border-border pb-4"
        role="group"
        aria-label="Filter saved links"
      >
        {[
          { label: "All links", value: false, count: posts.length },
          { label: "With notes", value: true, count: notesCount },
        ].map((filter) => (
          <button
            key={filter.label}
            type="button"
            aria-pressed={notesOnly === filter.value}
            onClick={() => setNotesOnly(filter.value)}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${notesOnly === filter.value ? "bg-secondary text-secondary-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            {filter.label}{" "}
            <span className="ml-1.5 tabular-nums text-muted-foreground">
              {filter.count}
            </span>
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        {entries.length} {entries.length === 1 ? "link" : "links"} shown
      </p>
      <ul className="divide-y divide-border">
        {entries.map((post) => {
          const source = post.url ? getHostname(post.url) : undefined;
          return (
            <li key={post.slug} className="py-4">
              <article className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-muted-foreground">
                    <span>{post.category ?? defaultCategory}</span>
                    {source && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="break-all">{source}</span>
                      </>
                    )}
                    {post.date && (
                      <>
                        <span aria-hidden="true">·</span>
                        <time dateTime={post.date}>
                          {formatContentDate(post.date)}
                        </time>
                      </>
                    )}
                  </div>
                  <h2 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                    <a
                      href={post.url ?? `${urlPrefix}/${post.slug}`}
                      target={post.url ? "_blank" : undefined}
                      rel={post.url ? "noopener noreferrer" : undefined}
                      className="rounded-sm hover:text-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {post.title}
                      {post.url && (
                        <>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="ml-1.5 inline h-4 w-4 align-baseline text-muted-foreground"
                          />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </>
                      )}
                    </a>
                  </h2>
                  {post.description && (
                    <p className="mt-1 max-w-2xl text-sm leading-5 text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                  {post.hasNotes && (
                    <Link
                      href={`${urlPrefix}/${post.slug}`}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-link underline decoration-link/30 underline-offset-4 hover:text-link-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <NotebookPen aria-hidden="true" className="h-3.5 w-3.5" />
                      My notes
                    </Link>
                  )}
                </div>
                <LinkThumbnail
                  key={post.image ?? post.url ?? post.slug}
                  src={getLinkPreviewImage(post.url, post.image)}
                />
              </article>
            </li>
          );
        })}
      </ul>
      {!entries.length && (
        <p className="py-12 text-sm text-muted-foreground">
          {notesOnly
            ? "No notes yet. Explore all links for the original sources."
            : "Nothing saved here yet."}
        </p>
      )}
    </section>
  );
}

function getHostname(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

function LinkThumbnail({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <div className="relative mt-1 aspect-video w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted sm:w-28">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 640px) 112px, 80px"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
