import Hero from "@/components/hero";
import { BlogManifestPostList } from "@/components/BlogManifestPostList";
import type { PostPreview } from "@/components/post-preview";

interface PostListPageProps {
  title: string;
  description: string;
  posts: ReadonlyArray<PostPreview>;
  urlPrefix?: string;
}

export default function PostListPage({
  title,
  description,
  posts,
  urlPrefix,
}: PostListPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <Hero title={title} content={description} />

        {/* Main content */}
        <BlogManifestPostList posts={posts} urlPrefix={urlPrefix} />
      </div>
    </div>
  );
}
