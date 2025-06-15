import PostDetailPage from "@/components/PostDetailPage";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function BlogPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) {
        notFound()
    }
    return <PostDetailPage post={post} />
}

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}