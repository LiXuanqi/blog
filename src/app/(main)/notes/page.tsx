import PostListPage from "@/components/PostListPage";
import { getAllNotes } from "@/lib/mdx";
import { SITE_CONFIG } from "@/lib/site-config";

export default async function NotesPage() {
  const notes = await getAllNotes("en");

  return (
    <PostListPage
      title={SITE_CONFIG.notes.title}
      description={SITE_CONFIG.notes.description}
      posts={notes}
      urlPrefix="/notes"
    />
  );
}
