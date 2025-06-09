import { PostSection } from "@/components/PostSection";
import { getAllPosts } from '@/lib/mdx'

const MOCK_POSTS = [
    {slug: 'hi', title: 'hi', date:'2024-01-03'},
    {slug: 'hi', title: 'hi', date:'2024-01-03'},
    {slug: 'hi', title: 'hi', date:'2024-01-03'},
    {slug: 'hi', title: 'hi', date:'2024-01-03'},
];

export default async function BlogsPage() {
    const posts = await getAllPosts()
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        <span className="border-b-4 border-pink-400 pb-1">Blog</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        Thoughts on web development, programming, and technology.
                        I write about what I learn and build.
                    </p>
                </div>
                {/* Main content */}

                {/* <BlogList postsByYear={{'2024': getAllPosts()}} /> */}
                <PostSection sectionTitle='2024' posts={posts} />
                <PostSection sectionTitle='2023' posts={MOCK_POSTS} />
                <PostSection sectionTitle='2022' posts={MOCK_POSTS} />

            </div>
        </div>

    );

}


export type Post = {
  slug: string;
  title: string;
  date: string

}

// export function PostSection({ postsByYear }: {
//   postsByYear: Record<string, ReadonlyArray<Post>>
// }) {

//   const years = Object.keys(postsByYear);

//   return (
//     <div className="space-y-12">
//       {years.map((year) => (
//         <div key={year} className="year-section">
//           {/* Posts List */}
//           <div className="posts-container max-w-2xl">
//             <PostList sectionTitle={year} posts={postsByYear[year]} />

//           </div>
//         </div>
//       ))}
//     </div>
//   );

// }