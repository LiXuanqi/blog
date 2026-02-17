import PostListPage from "@/components/PostListPage";
import { SITE_CONFIG } from "@/lib/site-config";
import { getGeneratedPostListAsync } from "@/lib/generated-content";
import { LOCALES, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function NotesPageByLanguage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const notes = await getGeneratedPostListAsync("notes", lang);

  return (
    <PostListPage
      title={SITE_CONFIG.notes.title}
      description={SITE_CONFIG.notes.description}
      posts={notes}
      urlPrefix={`/${lang}/notes`}
    />
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
