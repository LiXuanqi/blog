import { describe, it, expect, beforeEach } from "vitest";
import { z } from "zod";
import path from "path";
import { MarkdownProcessor } from "./processor";
import { LocalFileSystemConnector } from "../connectors/local-fs-connecter";

// Test schemas
const BlogSchema = z.object({
  title: z.string(),
  date: z.date(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const NoteSchema = z.object({
  title: z.string(),
  category: z.string(),
  priority: z.number().optional(),
});

type BlogPost = z.infer<typeof BlogSchema>;
type Note = z.infer<typeof NoteSchema>;

describe("MarkdownProcessor", () => {
  let processor: MarkdownProcessor;
  let blogConnector: LocalFileSystemConnector;
  let noteConnector: LocalFileSystemConnector;

  beforeEach(() => {
    const fixturesPath = path.resolve(__dirname, "../__fixtures__");

    blogConnector = new LocalFileSystemConnector({
      contentDir: path.join(fixturesPath, "blogs"),
      sourceId: "blogs",
    });

    noteConnector = new LocalFileSystemConnector({
      contentDir: path.join(fixturesPath, "notes"),
      sourceId: "notes",
    });

    processor = new MarkdownProcessor({
      sources: [
        {
          id: "blogs",
          connector: blogConnector,
          schema: BlogSchema,
        },
        {
          id: "notes",
          connector: noteConnector,
          schema: NoteSchema,
        },
      ],
    });
  });

  describe("process", () => {
    it("processes all sources and returns MarkdownCollection", async () => {
      const collection = await processor.process();

      expect(collection).toBeDefined();
      const allDocs = collection.getAll();
      expect(allDocs).toHaveLength(5); // 3 blogs + 2 notes
    });

    it.skip("validates frontmatter with source schemas", async () => {
      const collection = await processor.process();

      const blogPost = collection.getBySlug<BlogPost>("hello-world");
      expect(blogPost).not.toBeNull();
      expect(blogPost!.frontmatter.title).toBe("Hello World");
      expect(blogPost!.frontmatter.date).toBeInstanceOf(Date);
      expect(blogPost!.frontmatter.published).toBe(true);
      expect(blogPost!.frontmatter.tags).toEqual(["intro", "welcome"]);

      const note = collection.getBySlug<Note>("meeting-notes");
      expect(note).not.toBeNull();
      expect(note!.frontmatter.title).toBe("Meeting Notes");
      expect(note!.frontmatter.category).toBe("work");
      expect(note!.frontmatter.priority).toBe(1);
    });

    it("handles invalid frontmatter gracefully", async () => {
      const collection = await processor.process();
      const invalidPost = collection.getBySlug("invalid-frontmatter");

      expect(invalidPost).not.toBeNull();
      expect(invalidPost!.frontmatter).toEqual({}); // Empty object due to validation failure
    });

    it.skip("preserves raw content in processed documents", async () => {
      const collection = await processor.process();
      const blogPost = collection.getBySlug("hello-world");

      expect(blogPost!.content).toContain("---");
      expect(blogPost!.content).toContain("title: Hello World");
      expect(blogPost!.content).toContain("# Hello World");
      expect(blogPost!.content).toContain("This is my first post.");
    });

    it.skip("maintains source information", async () => {
      const collection = await processor.process();

      const blogPost = collection.getBySlug("hello-world");
      expect(blogPost!.sourceId).toBe("blogs");

      const note = collection.getBySlug("meeting-notes");
      expect(note!.sourceId).toBe("notes");
    });
  });

  describe("getRawAll", () => {
    it("returns raw documents from all sources", async () => {
      const rawDocs = await processor.getRawAll();

      expect(rawDocs).toHaveLength(5);
      expect(
        rawDocs.every((doc) => doc.content && doc.slug && doc.source),
      ).toBe(true);
    });

    it("returns raw documents from specific source", async () => {
      const blogDocs = await processor.getRawAll("blogs");
      expect(blogDocs).toHaveLength(3);
      expect(blogDocs.every((doc) => doc.sourceId === "blogs")).toBe(true);

      const noteDocs = await processor.getRawAll("notes");
      expect(noteDocs).toHaveLength(2);
      expect(noteDocs.every((doc) => doc.sourceId === "notes")).toBe(true);
    });

    it("throws error for unknown source", async () => {
      await expect(processor.getRawAll("unknown")).rejects.toThrow(
        "Source unknown not found",
      );
    });
  });
});
