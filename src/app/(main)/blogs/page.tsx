import PostListPage from "@/components/PostListPage";
import { getContentStoreAsync } from "@/lib/markdown/core/content-store";
import { SITE_CONFIG } from "@/lib/site-config";

export default async function BlogsPage() {
  const contentStore = await getContentStoreAsync();
  const posts = contentStore.get("blogs")?.getList("en") ?? [];

  return (
    <PostListPage
      title={SITE_CONFIG.blog.title}
      description={SITE_CONFIG.blog.description}
      posts={posts}
    />
  );
}

export type Post = {
  slug: string;
  title: string;
  date: string;
};
