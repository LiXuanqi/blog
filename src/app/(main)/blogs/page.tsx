import Hero from "@/components/hero";
import { PostSection } from "@/components/PostSection";
import { getAllPosts } from '@/lib/mdx'


export default async function BlogsPage() {
    const posts = await getAllPosts()
    const { postsByYear, sortedYears } = _groupPostsByYear(posts);
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <Hero title="Blog" content="Thoughts on web development, programming, and technology.
                        I write about what I learn and build"/>
                {/* Main content */}

                {
                    sortedYears.map((year) => <PostSection key={year} sectionTitle={year} posts={postsByYear[year]} />)
                }


            </div>
        </div>

    );
}


export type Post = {
    slug: string;
    title: string;
    date: string
}

function _groupPostsByYear(posts: ReadonlyArray<Post>): {
    postsByYear: Record<string, ReadonlyArray<Post>>;
    sortedYears: ReadonlyArray<string>
} {

    const grouped = posts.reduce((acc, post) => {
        const year = new Date(post.date).getFullYear().toString();

        if (!acc[year]) {
            acc[year] = [];
        }

        acc[year].push(post);
        return acc;
    }, {} as Record<string, Post[]>);

    // Convert arrays to ReadonlyArray and sort posts within each year by date (newest first)
    const postsByYear: Record<string, ReadonlyArray<Post>> = {};

    // Sort years in descending order (newest years first)
    const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));
    console.log(sortedYears);

    sortedYears.forEach(year => {
        postsByYear[year] = grouped[year].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    });

    return {
        sortedYears,
        postsByYear
    };
}
