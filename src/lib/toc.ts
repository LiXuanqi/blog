export interface TocItem {
  value: string;
  depth: number;
  url: string;
}

/**
 * Extract headings from markdown content using regex
 * This works with the raw markdown before MDX processing
 */
export function extractTocFromMarkdown(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length; // Number of # characters
    const value = match[2].trim();
    const url = `#${generateSlug(value)}`;

    headings.push({
      value,
      depth,
      url,
    });
  }

  return headings;
}

/**
 * Generate URL-safe slug from heading text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
    .trim();
}

/**
 * Process TOC items to handle duplicate slugs
 */
export function processTocItems(items: TocItem[]): TocItem[] {
  const slugCounts = new Map<string, number>();

  return items.map((item) => {
    let slug = generateSlug(item.value);

    // Handle duplicate slugs by adding a counter
    if (slugCounts.has(slug)) {
      const count = slugCounts.get(slug)! + 1;
      slugCounts.set(slug, count);
      slug = `${slug}-${count}`;
    } else {
      slugCounts.set(slug, 1);
    }

    return {
      ...item,
      url: `#${slug}`,
    };
  });
}
