import PostDetailPage from "@/components/PostDetailPage";
import { getContentStoreAsync } from "@/lib/markdown/core/content-store";
import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const language = lang || "en"; // Default to English

  const post = await getPostBySlug(slug, language);
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
