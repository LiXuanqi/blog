import Link from "next/link";

export type PostPreview = {
  slug: string;
  title: string;
  date: string;
  language?: string;
  description?: string;
  image?: string;
  tags?: ReadonlyArray<string>;
  category?: string;
};

export function PostList({
  posts,
  limit,
  urlPrefix = "/blogs",
}: {
  posts: ReadonlyArray<PostPreview>;
  limit?: number;
  urlPrefix?: string;
}) {
  const displayPosts = limit ? posts.slice(0, limit) : posts;
  return (
    <div className="w-full">
      <div className="border-l-2 border-border-muted pl-6 space-y-0">
        {displayPosts.map((post) => (
          <Link key={post.slug} href={`${urlPrefix}/${post.slug}`} passHref>
            <div className="group block border-b border-border py-3 transition-all duration-200 last:border-b-0 hover:bg-link/5 md:hover:-ml-6 md:hover:-mr-6 md:hover:rounded-r-lg md:hover:pl-6 md:hover:pr-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold leading-tight text-foreground transition-colors duration-200 group-hover:text-link">
                    {post.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground md:w-40 md:justify-end">
                  <time
                    dateTime={post.date}
                    className={
                      "transition-colors duration-200 group-hover:text-foreground"
                    }
                  >
                    {_formatDate(post.date)}
                  </time>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
function _formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
