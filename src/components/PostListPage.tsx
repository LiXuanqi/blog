import Hero from "@/components/hero";
import { PostSection } from "@/components/PostSection";
import type { PostPreview } from "@/components/post-list";

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
  const { postsByYear, sortedYears } = groupPostsByYear(posts);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <Hero title={title} content={description} />

        {/* Main content */}
        {sortedYears.map((year) => (
          <PostSection
            key={year}
            sectionTitle={year}
            posts={postsByYear[year]}
            urlPrefix={urlPrefix}
          />
        ))}
      </div>
    </div>
  );
}

function groupPostsByYear(posts: ReadonlyArray<PostPreview>): {
  postsByYear: Record<string, ReadonlyArray<PostPreview>>;
  sortedYears: ReadonlyArray<string>;
} {
  const grouped = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString();

      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(post);
      return acc;
    },
    {} as Record<string, PostPreview[]>,
  );

  // Convert arrays to ReadonlyArray and sort posts within each year by date (newest first)
  const postsByYear: Record<string, ReadonlyArray<PostPreview>> = {};

  // Sort years in descending order (newest years first)
  const sortedYears = Object.keys(grouped).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  sortedYears.forEach((year) => {
    postsByYear[year] = grouped[year].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  });

  return {
    sortedYears,
    postsByYear,
  };
}
