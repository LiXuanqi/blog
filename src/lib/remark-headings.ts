import { generateSlug, type TocItem } from "./toc";

interface MarkdownNode {
  type: string;
  value?: string;
  alt?: string;
  depth?: number;
  children?: MarkdownNode[];
  data?: { hProperties?: Record<string, unknown> };
}

function headingText(node: MarkdownNode): string {
  if (node.type === "image") return node.alt ?? "";
  return node.value ?? node.children?.map(headingText).join("") ?? "";
}

/** Derive both navigation and rendered IDs from the same parsed MDX headings. */
export function remarkHeadings(items: TocItem[]) {
  return () => (tree: MarkdownNode) => {
    const used = new Set<string>();
    items.length = 0;
    function visit(node: MarkdownNode) {
      if (node.type === "heading" && node.depth) {
        const value = headingText(node);
        const base = generateSlug(value) || "section";
        let id = base;
        let suffix = 2;
        while (used.has(id)) id = `${base}-${suffix++}`;
        used.add(id);
        node.data = {
          ...node.data,
          hProperties: { ...node.data?.hProperties, id },
        };
        if (node.depth === 2 || node.depth === 3) {
          items.push({ value, depth: node.depth, url: `#${id}` });
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
