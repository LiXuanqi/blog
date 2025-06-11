import { Post } from "@/app/(main)/blogs/page";
import { PostList } from "./post-list";


export function PostSection({ sectionTitle, posts }: {
  sectionTitle: string;
  posts: ReadonlyArray<Post>
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
      <PostList posts={posts}/>
      
    </div>
  );

}


