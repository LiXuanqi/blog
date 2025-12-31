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
        path.join(tempDir, "other.md"),
        "---\ntitle: Test MD\n---\nContent",
      );
      fs.writeFileSync(path.join(tempDir, "ignore.txt"), "Should be ignored");

      const result = await connector.getAll();

      expect(result).toHaveLength(2);
      const slugs = result.map((doc) => doc.slug).sort();
      expect(slugs).toEqual(["other", "test"]);
    });

    it("returns raw content including frontmatter", async () => {
      const rawContent = `---
title: Test Post
date: 2023-01-01
tags: [test, markdown]
---
# Test Content`;

      fs.writeFileSync(path.join(tempDir, "test-post.mdx"), rawContent);

      const result = await connector.getAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        slug: "test-post",
        content: rawContent,
        source: "local",
      });
    });

    it("returns files without sorting", async () => {
      fs.writeFileSync(
        path.join(tempDir, "alpha.mdx"),
        "---\ndate: 2023-01-01\n---\nOld",
      );
      fs.writeFileSync(
        path.join(tempDir, "beta.mdx"),
        "---\ndate: 2023-12-31\n---\nNew",
      );

      const result = await connector.getAll();

      expect(result).toHaveLength(2);
      const slugs = result.map((doc) => doc.slug).sort();
      expect(slugs).toEqual(["alpha", "beta"]);
    });

    it("returns content with no processing", async () => {
      const rawContent = "---\ntitle: No Date\n---\nContent";
      fs.writeFileSync(path.join(tempDir, "no-date.mdx"), rawContent);

      const result = await connector.getAll();

      expect(result).toHaveLength(1);
      expect(result[0].content).toBe(rawContent);
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
      expect(result!.content).toBe("---\ntitle: Test\n---\nContent");
      expect(result!.source).toBe("local");
    });

    it("finds .md file by slug", async () => {
      const result = await connector.getBySlug("markdown");

      expect(result).not.toBeNull();
      expect(result!.slug).toBe("markdown");
      expect(result!.content).toBe("---\ntitle: MD File\n---\nMD Content");
      expect(result!.source).toBe("local");
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

      expect(result!.content).toBe("---\ntitle: MDX Version\n---\nMDX");
    });

    it("returns only raw fields", async () => {
      const result = await connector.getBySlug("test-post");

      expect(result).toHaveProperty("slug");
      expect(result).toHaveProperty("content");
      expect(result).toHaveProperty("source");
    });
  });
});
