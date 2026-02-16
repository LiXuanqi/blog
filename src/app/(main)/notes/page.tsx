import PostListPage from "@/components/PostListPage";
import { SITE_CONFIG } from "@/lib/site-config";
import { getContentStoreAsync } from "@/lib/markdown/core/content-store";

export default async function NotesPage() {
  const contentStore = await getContentStoreAsync();
  const notes = contentStore.get("notes")?.getList("en") ?? [];

  return (
    <PostListPage
      title={SITE_CONFIG.notes.title}
      description={SITE_CONFIG.notes.description}
      posts={notes}
      urlPrefix="/notes"
    />
  );
}
