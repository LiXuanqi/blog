import PostListPage from "@/components/PostListPage";
import { getContentStoreAsync } from "@/lib/markdown/core/content-store";
import { SITE_CONFIG } from "@/lib/site-config";
import { LOCALES, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function BlogsPageByLanguage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const contentStore = await getContentStoreAsync();
  const posts = contentStore.get("blogs")?.getList(lang) ?? [];

  return (
    <PostListPage
      title={SITE_CONFIG.blog.title}
      description={SITE_CONFIG.blog.description}
      posts={posts}
      urlPrefix={`/${lang}/blogs`}
    />
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
