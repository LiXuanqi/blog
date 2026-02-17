import PostDetailPage from "@/components/PostDetailPage";
import { getContentStoreAsync } from "@/lib/markdown/core/content-store";
import { LOCALES, isLocale, toCanonicalSlug } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function NotePageByLanguage({ params }: PageProps) {
  const { slug, lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const contentStore = await getContentStoreAsync();
  const note = contentStore.get("notes")?.getItemBySlug(slug, lang);
  if (!note) {
    notFound();
  }
  return <PostDetailPage post={note} type="note" locale={lang} />;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const contentStore = await getContentStoreAsync();
  const params = [];

  for (const lang of LOCALES) {
    const notes = contentStore.get("notes")?.getList(lang) ?? [];
    params.push(
      ...notes.map((note) => ({
        lang,
        slug: toCanonicalSlug(note.slug, lang),
      })),
    );
  }

  return params;
}
