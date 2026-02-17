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

export default async function NotePageByLanguage({ params }: PageProps) {
  const { slug, lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const note = await getGeneratedPostBySlugAsync("notes", lang, slug);
  if (!note) {
    notFound();
  }
  return <PostDetailPage post={note} type="note" locale={lang} />;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return await getGeneratedStaticParamsAsync("notes");
}
