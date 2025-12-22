import PostDetailPage from "@/components/PostDetailPage";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
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
  const posts = await getAllPosts(); // Get all posts in all languages
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
