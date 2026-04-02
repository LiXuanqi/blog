import type { PostPreview } from "@/components/post-list";
import type { TocItem } from "@/lib/toc";

export const storybookPosts: ReadonlyArray<PostPreview> = [
  {
    slug: "building-a-content-pipeline",
    title: "Building a Content Pipeline for a Personal Site",
    date: "2026-02-14",
    language: "en",
  },
  {
    slug: "nextjs-app-router-notes",
    title: "Next.js App Router Notes",
    date: "2026-01-08",
    language: "en",
  },
  {
    slug: "tailwind-v4-upgrade",
    title: "Tailwind v4 Upgrade Notes",
    date: "2025-11-03",
    language: "en",
  },
  {
    slug: "mdx-localization",
    title: "Localized MDX Content Strategy",
    date: "2025-07-19",
    language: "zh",
  },
];

export const singleStorybookPost: ReadonlyArray<PostPreview> = [
  storybookPosts[0],
];

export const emptyStorybookPosts: ReadonlyArray<PostPreview> = [];

export const storybookTocItems: TocItem[] = [
  {
    value: "Overview",
    depth: 1,
    url: "#overview",
  },
  {
    value: "Component Inventory",
    depth: 2,
    url: "#component-inventory",
  },
  {
    value: "Story Authoring Conventions",
    depth: 2,
    url: "#story-authoring-conventions",
  },
  {
    value: "Future Improvements",
    depth: 3,
    url: "#future-improvements",
  },
];
