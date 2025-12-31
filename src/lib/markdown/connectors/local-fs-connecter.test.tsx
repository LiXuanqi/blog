import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import { tmpdir } from "os";
import { LocalFileSystemConnector } from "./local-fs-connecter";

describe("LocalFileSystemConnector", () => {
  let tempDir: string;
  let connector: LocalFileSystemConnector;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(tmpdir(), "markdown-test-"));
    connector = new LocalFileSystemConnector({ contentDir: tempDir });
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe("getAll", () => {
    it("returns empty array when directory does not exist", async () => {
      const nonExistentConnector = new LocalFileSystemConnector({
        contentDir: path.join(tempDir, "nonexistent"),
      });
      const result = await nonExistentConnector.getAll();
      expect(result).toEqual([]);
    });

    it("returns empty array when directory is empty", async () => {
      const result = await connector.getAll();
      expect(result).toEqual([]);
    });

    it("filters and returns only markdown files", async () => {
      // Create test files
      fs.writeFileSync(
        path.join(tempDir, "test.mdx"),
        "---\ntitle: Test\n---\nContent",
      );
      fs.writeFileSync(
        path.join(tempDir, "test.md"),
        "---\ntitle: Test MD\n---\nContent",
      );
      fs.writeFileSync(path.join(tempDir, "ignore.txt"), "Should be ignored");

      const result = await connector.getAll();

      expect(result).toHaveLength(2);
      expect(
        result.every((doc) => doc.slug === "test" || doc.slug === "test"),
      ).toBe(true);
    });

    it("parses frontmatter correctly", async () => {
      const frontmatter = `---
title: Test Post
date: 2023-01-01
tags: [test, markdown]
---
# Test Content`;

      fs.writeFileSync(path.join(tempDir, "test-post.mdx"), frontmatter);

      const result = await connector.getAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        slug: "test-post",
        content: "# Test Content",
        frontmatter: {
          title: "Test Post",
          date: new Date("2023-01-01"),
          tags: ["test", "markdown"],
        },
        source: "local",
      });
      expect(result[0].lastModified).toBeInstanceOf(Date);
    });

    it("sorts by date descending", async () => {
      fs.writeFileSync(
        path.join(tempDir, "old.mdx"),
        "---\ndate: 2023-01-01\n---\nOld",
      );
      fs.writeFileSync(
        path.join(tempDir, "new.mdx"),
        "---\ndate: 2023-12-31\n---\nNew",
      );

      const result = await connector.getAll();

      expect(result).toHaveLength(2);
      expect(result[0].slug).toBe("new");
      expect(result[1].slug).toBe("old");
    });

    it("falls back to lastModified when no date in frontmatter", async () => {
      fs.writeFileSync(
        path.join(tempDir, "no-date.mdx"),
        "---\ntitle: No Date\n---\nContent",
      );

      const result = await connector.getAll();

      expect(result).toHaveLength(1);
      expect(result[0].lastModified).toBeInstanceOf(Date);
    });
  });

  describe("getBySlug", () => {
    beforeEach(() => {
      fs.writeFileSync(
        path.join(tempDir, "test-post.mdx"),
        "---\ntitle: Test\n---\nContent",
      );
      fs.writeFileSync(
        path.join(tempDir, "markdown.md"),
        "---\ntitle: MD File\n---\nMD Content",
      );
    });

    it("returns null when slug not found", async () => {
      const result = await connector.getBySlug("nonexistent");
      expect(result).toBeNull();
    });

    it("finds .mdx file by slug", async () => {
      const result = await connector.getBySlug("test-post");

      expect(result).not.toBeNull();
      expect(result!.slug).toBe("test-post");
      expect(result!.frontmatter.title).toBe("Test");
      expect(result!.content).toBe("Content");
    });

    it("finds .md file by slug", async () => {
      const result = await connector.getBySlug("markdown");

      expect(result).not.toBeNull();
      expect(result!.slug).toBe("markdown");
      expect(result!.frontmatter.title).toBe("MD File");
      expect(result!.content).toBe("MD Content");
    });

    it("prefers .mdx over .md when both exist", async () => {
      fs.writeFileSync(
        path.join(tempDir, "duplicate.mdx"),
        "---\ntitle: MDX Version\n---\nMDX",
      );
      fs.writeFileSync(
        path.join(tempDir, "duplicate.md"),
        "---\ntitle: MD Version\n---\nMD",
      );

      const result = await connector.getBySlug("duplicate");

      expect(result!.frontmatter.title).toBe("MDX Version");
    });

    it("includes lastModified timestamp", async () => {
      const result = await connector.getBySlug("test-post");

      expect(result!.lastModified).toBeInstanceOf(Date);
    });
  });
});
