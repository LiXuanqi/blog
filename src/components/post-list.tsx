
import { Post } from "@/lib/mdx";
import Link from "next/link";
export function PostList({  posts, limit, urlPrefix = '/blogs' }: {
    posts: ReadonlyArray<Post>
    limit?: number
    urlPrefix?: string
  }) {
    const displayPosts = limit ? posts.slice(0, limit) : posts
    return (
        <div className="w-full">
        <div className="border-l-2 border-border-muted pl-6 space-y-0">
          {displayPosts.map((post) => (

            <Link
              key={post.slug} href={`${urlPrefix}/${post.slug}`} passHref>
              <div

                className="group block py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 md:hover:-ml-6 md:hover:-mr-6 md:hover:pl-6 md:hover:pr-6 md:hover:rounded-r-lg"
              >


                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 md:w-40 md:justify-end">
                    <time
                      dateTime={post.date}
                      className={'group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200'}
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
    })
  }
