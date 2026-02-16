import PostDetailPage from "@/components/PostDetailPage";
import { getContentStoreAsync } from "@/lib/markdown/core/content-store";
import { LanguageKey } from "@/lib/markdown/core/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;

  const contentStore = await getContentStoreAsync();
  // TODO: validate the lang is one of LanguageKey
  const post = contentStore
    .get("blogs")
    ?.getItemBySlug(slug, lang as LanguageKey);
  if (!post) {
    notFound();
  }
  return <PostDetailPage post={post} type="blog" />;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const contentStore = await getContentStoreAsync();
  const blogs = contentStore.get("blogs")?.getList() ?? [];
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}
