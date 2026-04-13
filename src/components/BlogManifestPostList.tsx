import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import type { PostPreview } from "@/components/post-preview";
import { PostCard } from "@/components/ui/post-card";
import type { Post } from "@/components/ui/types";

interface BlogManifestPostListProps {
  posts: ReadonlyArray<PostPreview>;
  urlPrefix?: string;
}

export function BlogManifestPostList({
  posts,
  urlPrefix = "/blogs",
}: BlogManifestPostListProps) {
  const manifestPosts = toManifestPosts(posts, urlPrefix);

  return (
    <div className="space-y-4">
      {manifestPosts.map((post) => (
        <Link
          key={post.url ?? post.title}
          href={post.url ?? urlPrefix}
          className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="[&_button[data-slot=button]]:hidden [&_img]:transition-transform [&_img]:duration-300 [&>div]:transition-all [&>div]:duration-200 group-hover:[&_img]:scale-[1.03] group-hover:[&>div]:-translate-y-0.5 group-hover:[&>div]:border-link/25 group-hover:[&>div]:shadow-lg">
            <PostCard
              data={{ post }}
              appearance={{
                variant: "horizontal",
                showAuthor: false,
                showCategory: true,
                hideAction: true,
              }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

function toManifestPosts(
  posts: ReadonlyArray<PostPreview>,
  urlPrefix: string,
): Post[] {
  return posts.map((post) => ({
    title: post.title,
    excerpt: post.description,
    coverImage: post.image || SITE_CONFIG.assets.profileImage,
    publishedAt: post.date,
    tags: post.tags ? [...post.tags] : undefined,
    category: post.category ?? post.tags?.[0] ?? "Article",
    url: `${urlPrefix}/${post.slug}`,
  }));
}
