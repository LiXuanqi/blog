import { MarkdownProcessor } from "./core/processor";
import { LocalFsConnector } from "./connectors/local-fs-connecter";
import { contentStore } from "./core/content-store";
import { MarkdownCollection } from "./core/markdown-collection";
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

const NoteSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  visible: z.boolean().optional(),
});

const LinkSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  url: z.string().optional(),
  category: z.string().optional(),
  visible: z.boolean().optional(),
});

/**
 * Initialize the content store with processed markdown collections
 */
export async function initializeContentStore(): Promise<void> {
  if (contentStore.isInitialized()) {
    return; // Already initialized
  }

  // Create separate processors for each content type
  const blogProcessor = new MarkdownProcessor({
    sources: [
      {
        id: "blogs",
        connector: new LocalFsConnector(
          path.join(process.cwd(), "content/blogs"),
        ),
        schema: BlogSchema,
      },
    ],
  });

  const noteProcessor = new MarkdownProcessor({
    sources: [
      {
        id: "notes",
        connector: new LocalFsConnector(
          path.join(process.cwd(), "content/notes"),
        ),
        schema: NoteSchema,
      },
    ],
  });

  const linkProcessor = new MarkdownProcessor({
    sources: [
      {
        id: "links",
        connector: new LocalFsConnector(
          path.join(process.cwd(), "content/links"),
        ),
        schema: LinkSchema,
      },
    ],
  });

  try {
    // Process each collection
    const [blogCollection, noteCollection, linkCollection] = await Promise.all([
      blogProcessor.process(),
      noteProcessor.process(),
      linkProcessor.process(),
    ]);

    // Register collections in the store
    contentStore.register("blogs", blogCollection);
    contentStore.register("notes", noteCollection);
    contentStore.register("links", linkCollection);

    contentStore.markInitialized();
  } catch (error) {
    console.error("Failed to initialize content store:", error);
    // Register empty collections as fallback
    contentStore.register("blogs", new MarkdownCollection([]));
    contentStore.register("notes", new MarkdownCollection([]));
    contentStore.register("links", new MarkdownCollection([]));
    contentStore.markInitialized();
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
