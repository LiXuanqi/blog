import { describe, expect, it } from "vitest";
import {
  BASE_FRONTMATTER_SCHEMA,
  BLOG_FRONTMATTER_SCHEMA,
} from "@/lib/content/frontmatter";

describe("content frontmatter schemas", () => {
  it("defaults visible to false", () => {
    const result = BASE_FRONTMATTER_SCHEMA.parse({
      title: "Test Post",
      date: "2026-03-07",
    });

    expect(result.visible).toBe(false);
  });

  it("parses optional blog fields", () => {
    const result = BLOG_FRONTMATTER_SCHEMA.parse({
      title: "Test Post",
      date: "2026-03-07",
      visible: true,
      description: "Example",
      tags: ["one", "two"],
    });

    expect(result).toEqual({
      title: "Test Post",
      date: "2026-03-07",
      visible: true,
      description: "Example",
      tags: ["one", "two"],
    });
  });
});
