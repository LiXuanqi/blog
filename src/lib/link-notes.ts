/** A bookmark gets a notes page when its Markdown body contains writing. */
export function hasLinkNotes(content: string): boolean {
  return content.replace(/<!--[\s\S]*?-->/g, "").trim().length > 0;
}
