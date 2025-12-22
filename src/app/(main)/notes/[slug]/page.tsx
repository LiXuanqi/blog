import PostDetailPage from "@/components/PostDetailPage";
import { getAllNotes, getNoteBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function NotePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const language = lang || "en"; // Default to English

  const note = await getNoteBySlug(slug, language);
  if (!note) {
    notFound();
  }
  return <PostDetailPage post={note} type="note" />;
}

// Generate static params for all notes
export async function generateStaticParams() {
  const notes = await getAllNotes(); // Get all notes in all languages
  return notes.map((note) => ({
    slug: note.slug,
  }));
}
