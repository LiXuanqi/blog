import { Post } from "@/lib/mdx";
import { PostList } from "./post-list";


export function PostSection({ sectionTitle, posts, urlPrefix }: {
  sectionTitle: string;
  posts: ReadonlyArray<Post>
  urlPrefix?: string;
}) {
  return (
    <div key={sectionTitle} className="mb-8">
      {/* Year Header */}
      <div className="font-semibold inline-block border-l-4 border-post-section-primary-border pl-4">
        <h2 className="text-2xl">
          {sectionTitle}
        </h2>
      </div>

      {/* Posts List */}
      <PostList posts={posts} urlPrefix={urlPrefix}/>
      
    </div>
  );
}


