import { PageHeader } from "@/components/page-header";
import { ManifestEntryList } from "@/components/ManifestEntryList";
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
    <div className="bg-background">
      <div className="site-page">
        {/* Header */}
        <PageHeader title={title} description={description} />

        {/* Main content */}
        <ManifestEntryList posts={posts} urlPrefix={urlPrefix} />
      </div>
    </div>
  );
}
