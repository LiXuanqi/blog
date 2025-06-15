import PostListPage from "@/components/PostListPage";
import { getAllPosts } from '@/lib/mdx'

export default async function BlogsPage() {
    const posts = await getAllPosts()
    
    return (
        <PostListPage 
            title="Blog" 
            description="Thoughts on web development, programming, and technology. I write about what I learn and build"
            posts={posts}
        />
    );
}

export type Post = {
    slug: string;
    title: string;
    date: string
}
