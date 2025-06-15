import PostListPage from "@/components/PostListPage";
import { getAllNotes } from '@/lib/mdx'

export default async function NotesPage() {
    const notes = await getAllNotes()
    
    return (
        <PostListPage 
            title="Notes" 
            description="Personal notes, quick thoughts, and learning snippets. A collection of my digital garden."
            posts={notes}
        />
    );
}