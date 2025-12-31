import { MarkdownProcessor } from "./core/processor";
import { LocalFileSystemConnector } from "./connectors/local-fs-connecter";
import { contentStore } from "./core/content-store";
import { z } from "zod";
import path from "path";

// Define schemas for your content types
const BlogSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  visible: z.boolean().optional(),
});

/**
 * Initialize the content store with processed markdown collections
 */
export async function initializeContentStore(): Promise<void> {
  if (contentStore.isInitialized()) {
    return; // Already initialized
  }

  // Create a single processor with multiple sources
  const processor = new MarkdownProcessor({
    sources: [
      {
        id: "blogs",
        connector: new LocalFileSystemConnector({
          contentDir: path.join(process.cwd(), "content/blogs"),
          sourceId: "blogs",
        }),
        schema: BlogSchema,
      },
      // {
      //   id: "notes",
      //   connector: new LocalFileSystemConnector(path.join(process.cwd(), "content/notes")),
      //   schema: NoteSchema,
      // },
      // {
      //   id: "links",
      //   connector: new LocalFileSystemConnector(path.join(process.cwd(), "content/links")),
      //   schema: LinkSchema,
      // },
    ],
  });

  try {
    // Process all sources - this will automatically register collections to the content store
    await processor.process();

    contentStore.markInitialized();
  } catch (error) {
    console.error("Failed to initialize content store:", error);
  }
}

// Helper functions to get typed collections
export function getBlogCollection() {
  return contentStore.get("blogs");
}

export function getNoteCollection() {
  return contentStore.get("notes");
}

export function getLinkCollection() {
  return contentStore.get("links");
}
