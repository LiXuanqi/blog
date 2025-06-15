import PostDetailPage from "@/components/PostDetailPage";
import { getAllNotes, getNoteBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function NotePage({ params }: PageProps) {
    const { slug } = await params
    const note = await getNoteBySlug(slug)
    if (!note) {
        notFound()
    }
    return <PostDetailPage post={note} />
}

// Generate static params for all notes
export async function generateStaticParams() {
    const notes = await getAllNotes()
    return notes.map((note) => ({
        slug: note.slug,
    }))
}