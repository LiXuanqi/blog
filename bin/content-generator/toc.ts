export interface TocItem {
  value: string;
  depth: number;
  url: string;
}

export function extractTocFromMarkdown(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
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

export function processTocItems(items: TocItem[]): TocItem[] {
  const slugCounts = new Map<string, number>();

  return items.map((item) => {
    let slug = generateSlug(item.value);

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

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}
