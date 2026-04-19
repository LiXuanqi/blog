import { describe, expect, it, vi } from "vitest";
import {
  extractPreviewImageUrlFromHtml,
  linkPreviewImagePlugin,
} from "./link-preview-image-plugin.ts";

describe("extractPreviewImageUrlFromHtml", () => {
  it("resolves a relative og:image URL against the page URL", () => {
    const html = `
      <html>
        <head>
          <meta property="og:image" content="/images/cover.png" />
        </head>
      </html>
    `;

    expect(
      extractPreviewImageUrlFromHtml(
        html,
        "https://example.com/articles/testing",
      ),
    ).toBe("https://example.com/images/cover.png");
  });

  it("falls back to twitter:image when og:image is missing", () => {
    const html = `
      <html>
        <head>
          <meta name="twitter:image" content="https://cdn.example.com/cover.jpg" />
        </head>
      </html>
    `;

    expect(
      extractPreviewImageUrlFromHtml(
        html,
        "https://example.com/articles/testing",
      ),
    ).toBe("https://cdn.example.com/cover.jpg");
  });
});

describe("linkPreviewImagePlugin", () => {
  it("does not fetch when the frontmatter already defines an image", async () => {
    const fetchMock = vi.fn<typeof fetch>();
    const plugin = linkPreviewImagePlugin(fetchMock);

    const result = await plugin.apply({
      slug: "example",
      content: "",
      source: "content/links/example.md",
      sourceId: "links",
      frontmatter: {
        title: "Example",
        image: "https://cdn.example.com/explicit.png",
        url: "https://example.com",
      },
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.frontmatter?.image).toBe(
      "https://cdn.example.com/explicit.png",
    );
  });

  it("fills image from fetched link metadata when frontmatter image is missing", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        `
          <html>
            <head>
              <meta property="og:image" content="/social-card.png" />
            </head>
          </html>
        `,
        {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
          },
        },
      ),
    );
    const plugin = linkPreviewImagePlugin(fetchMock);

    const result = await plugin.apply({
      slug: "example",
      content: "",
      source: "content/links/example.md",
      sourceId: "links",
      frontmatter: {
        title: "Example",
        url: "https://example.com/posts/1",
      },
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(result.frontmatter?.image).toBe(
      "https://example.com/social-card.png",
    );
  });

  it("keeps the document unchanged when metadata fetch fails", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new Error("network unavailable"));
    const plugin = linkPreviewImagePlugin(fetchMock);

    const result = await plugin.apply({
      slug: "example",
      content: "",
      source: "content/links/example.md",
      sourceId: "links",
      frontmatter: {
        title: "Example",
        url: "https://example.com/posts/1",
      },
    });

    expect(result.frontmatter?.image).toBeUndefined();
  });
});
