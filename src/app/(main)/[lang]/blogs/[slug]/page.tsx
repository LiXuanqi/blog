import PostDetailPage from "@/components/PostDetailPage";
import { getContentStoreAsync } from "@/lib/markdown/core/content-store";
import { LOCALES, isLocale, toCanonicalSlug } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function BlogPageByLanguage({ params }: PageProps) {
  const { slug, lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const contentStore = await getContentStoreAsync();
  const post = contentStore.get("blogs")?.getItemBySlug(slug, lang);
  if (!post) {
    notFound();
  }
  return <PostDetailPage post={post} type="blog" locale={lang} />;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const contentStore = await getContentStoreAsync();
  const params = [];

  for (const lang of LOCALES) {
    const blogs = contentStore.get("blogs")?.getList(lang) ?? [];
    params.push(
      ...blogs.map((blog) => ({
        lang,
        slug: toCanonicalSlug(blog.slug, lang),
      })),
    );
  }

  return params;
}
