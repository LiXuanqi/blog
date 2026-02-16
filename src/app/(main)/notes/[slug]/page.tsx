import PostDetailPage from "@/components/PostDetailPage";
import { getContentStoreAsync } from "@/lib/markdown/core/content-store";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function NotePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const language = lang === "zh" ? "zh" : "en";

  const contentStore = await getContentStoreAsync();
  const note = contentStore.get("notes")?.getItemBySlug(slug, language);
  if (!note) {
    notFound();
  }
  return <PostDetailPage post={note} type="note" />;
}

// Generate static params for all notes
export async function generateStaticParams() {
  const contentStore = await getContentStoreAsync();
  const notes = contentStore.get("notes")?.getList() ?? [];
  return notes.map((note) => ({
    slug: note.slug,
  }));
}
