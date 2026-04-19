import PostDetailPage from "@/components/PostDetailPage";
import {
  getGeneratedPostBySlugAsync,
  getGeneratedStaticParamsAsync,
} from "@/lib/generated-content";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function BlogPageByLanguage({ params }: PageProps) {
  const { slug, lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const post = await getGeneratedPostBySlugAsync("blogs", lang, slug);
  if (!post) {
    notFound();
  }
  return <PostDetailPage post={post} locale={lang} />;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return await getGeneratedStaticParamsAsync("blogs");
}
