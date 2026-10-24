import { describe, expect, it } from "vitest";
import { hasLinkNotes } from "./link-notes";

describe("bookmark notes", () => {
  it("keeps empty bookmarks and author-only comments out of the notes list", () => {
    expect(hasLinkNotes("\n \n")).toBe(false);
    expect(hasLinkNotes("<!-- Add notes later\nwhen ready -->\n")).toBe(false);
  });
  it("recognizes notes without relying on the legacy directLink flag", () => {
    expect(hasLinkNotes("A useful mental model.")).toBe(true);
    expect(
      hasLinkNotes("<!-- draft reminder -->\n## Takeaways\n- Measure first."),
    ).toBe(true);
  });
});
