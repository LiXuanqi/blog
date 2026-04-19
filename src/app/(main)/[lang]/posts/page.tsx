import PostListPage from "@/components/PostListPage";
import { getGeneratedPostListAsync } from "@/lib/generated-content";
import { SITE_CONFIG } from "@/lib/site-config";
import { LOCALES, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function PostsPageByLanguage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const posts = await getGeneratedPostListAsync("posts", lang);

  return (
    <PostListPage
      title={SITE_CONFIG.blog.title}
      description={SITE_CONFIG.blog.description}
      posts={posts}
      urlPrefix={`/${lang}/posts`}
    />
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
