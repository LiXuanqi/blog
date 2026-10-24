import { describe, expect, it } from "vitest";
import { serialize } from "next-mdx-remote/serialize";
import { remarkHeadings } from "./remark-headings";
import type { TocItem } from "./toc";

describe("article heading navigation", () => {
  it("uses parsed heading text and skips fenced code, preserving Unicode and unique IDs", async () => {
    const items: TocItem[] = [];
    const result = await serialize(
      [
        "## 使用 `Map` 和 **集合**",
        "## Repeat",
        "## Repeat",
        "## Repeat-2",
        "```md\n## Not a heading\n```",
        "### [Linked section](https://example.com)",
        "#### Deep section",
        "Setext heading\n--------------",
      ].join("\n\n"),
      { mdxOptions: { remarkPlugins: [remarkHeadings(items)] } },
    );
    expect(items).toEqual([
      { value: "使用 Map 和 集合", depth: 2, url: "#使用-map-和-集合" },
      { value: "Repeat", depth: 2, url: "#repeat" },
      { value: "Repeat", depth: 2, url: "#repeat-2" },
      { value: "Repeat-2", depth: 2, url: "#repeat-2-2" },
      { value: "Linked section", depth: 3, url: "#linked-section" },
      { value: "Setext heading", depth: 2, url: "#setext-heading" },
    ]);
    for (const item of items)
      expect(result.compiledSource).toContain(`id: "${item.url.slice(1)}"`);
  });

  it("resets slug state for every document", async () => {
    for (let index = 0; index < 2; index++) {
      const items: TocItem[] = [];
      await serialize("## Hello\n\n## Hello", {
        mdxOptions: { remarkPlugins: [remarkHeadings(items)] },
      });
      expect(items.map((item) => item.url)).toEqual(["#hello", "#hello-2"]);
    }
  });
});
