import PostListPage from "@/components/PostListPage";
import { getAllPosts } from "@/lib/mdx";
import { SITE_CONFIG } from "@/lib/site-config";

export default async function BlogsPage() {
  const posts = await getAllPosts();

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
