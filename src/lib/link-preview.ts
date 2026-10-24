/** Prefer an editorial image; YouTube videos have a stable thumbnail endpoint. */
export function getLinkPreviewImage(
  url?: string,
  image?: string,
): string | undefined {
  if (image?.trim()) return image.trim();
  if (!url) return undefined;
  try {
    const source = new URL(url);
    const host = source.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = source.pathname.split("/")[1];
    if (host === "youtube.com" || host === "m.youtube.com") {
      id =
        source.pathname === "/watch"
          ? source.searchParams.get("v")
          : (source.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1] ??
            null);
    }
    return id && /^[\w-]{11}$/.test(id)
      ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      : undefined;
  } catch {
    return undefined;
  }
}
