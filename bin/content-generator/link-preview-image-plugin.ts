import type { DocumentPlugin, PipelineDocument } from "./types.ts";

const DEFAULT_FETCH_TIMEOUT_MS = 5_000;

const SOCIAL_IMAGE_META_KEYS = [
  ["property", "og:image"],
  ["property", "og:image:secure_url"],
  ["property", "og:image:url"],
  ["name", "twitter:image"],
  ["name", "twitter:image:src"],
] as const;

type FetchLike = typeof fetch;

export function linkPreviewImagePlugin(
  fetchImpl: FetchLike = fetch,
): DocumentPlugin {
  const previewImageCache = new Map<string, Promise<string | undefined>>();

  return {
    name: "link-preview-image",
    async apply(document: PipelineDocument): Promise<PipelineDocument> {
      const frontmatter = document.frontmatter;
      if (!frontmatter) {
        return document;
      }

      const image = getTrimmedString(frontmatter.image);
      const url = getTrimmedString(frontmatter.url);

      if (image || !url) {
        return document;
      }

      let previewImagePromise = previewImageCache.get(url);
      if (!previewImagePromise) {
        previewImagePromise = fetchPreviewImageAsync(url, fetchImpl);
        previewImageCache.set(url, previewImagePromise);
      }

      const previewImage = await previewImagePromise;
      if (!previewImage) {
        return document;
      }

      return {
        ...document,
        frontmatter: {
          ...frontmatter,
          image: previewImage,
        },
      };
    },
  };
}

async function fetchPreviewImageAsync(
  pageUrl: string,
  fetchImpl: FetchLike,
): Promise<string | undefined> {
  try {
    const response = await fetchImpl(pageUrl, {
      headers: {
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(DEFAULT_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      return undefined;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && !contentType.toLowerCase().includes("text/html")) {
      return undefined;
    }

    const html = await response.text();
    return extractPreviewImageUrlFromHtml(html, response.url || pageUrl);
  } catch {
    return undefined;
  }
}

export function extractPreviewImageUrlFromHtml(
  html: string,
  pageUrl: string,
): string | undefined {
  const headHtml = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html;
  const tags = headHtml.match(/<(meta|link)\b[^>]*>/gi) ?? [];

  for (const [attributeName, attributeValue] of SOCIAL_IMAGE_META_KEYS) {
    for (const tag of tags) {
      if (!tag.toLowerCase().startsWith("<meta")) {
        continue;
      }

      const attributes = parseHtmlAttributes(tag);
      if (attributes[attributeName] !== attributeValue || !attributes.content) {
        continue;
      }

      const resolvedUrl = toAbsoluteHttpUrl(attributes.content, pageUrl);
      if (resolvedUrl) {
        return resolvedUrl;
      }
    }
  }

  for (const tag of tags) {
    if (!tag.toLowerCase().startsWith("<link")) {
      continue;
    }

    const attributes = parseHtmlAttributes(tag);
    const rel = attributes.rel?.toLowerCase();
    if (rel !== "image_src" || !attributes.href) {
      continue;
    }

    const resolvedUrl = toAbsoluteHttpUrl(attributes.href, pageUrl);
    if (resolvedUrl) {
      return resolvedUrl;
    }
  }

  return undefined;
}

function parseHtmlAttributes(tag: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const openingTagMatch = tag.match(/^<([a-z0-9:-]+)\b/i);
  const attrSource = tag
    .slice(openingTagMatch?.[0].length ?? 0)
    .replace(/\/?>\s*$/u, "");
  const attributePattern =
    /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/gu;

  for (const match of attrSource.matchAll(attributePattern)) {
    const [, rawName, doubleQuotedValue, singleQuotedValue, bareValue] = match;
    if (!rawName) {
      continue;
    }

    const value = doubleQuotedValue ?? singleQuotedValue ?? bareValue;
    if (value === undefined) {
      continue;
    }

    attributes[rawName.toLowerCase()] = decodeHtmlEntity(value.trim());
  }

  return attributes;
}

function toAbsoluteHttpUrl(value: string, pageUrl: string): string | undefined {
  const decodedValue = decodeHtmlEntity(value.trim());
  if (!decodedValue) {
    return undefined;
  }

  try {
    const url = new URL(decodedValue, pageUrl);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

function decodeHtmlEntity(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}
