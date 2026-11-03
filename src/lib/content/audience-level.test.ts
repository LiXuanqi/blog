import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_FRONTMATTER_SCHEMA } from "./frontmatter";
import { BLOG_FRONTMATTER_SCHEMA as GENERATOR_SCHEMA } from "../../../bin/content-generator/frontmatter";
import { AudienceBadge } from "@/components/audience-badge";

const post = { title: "Example", date: "2026-11-03" };

describe.each([BLOG_FRONTMATTER_SCHEMA, GENERATOR_SCHEMA])(
  "audience metadata",
  (schema) => {
    it.each(["everyone", "beginner", "intermediate", "advanced"])(
      "preserves %s",
      (level) => {
        expect(
          schema.parse({ ...post, audience_level: level }).audience_level,
        ).toBe(level);
      },
    );

    it("keeps existing posts valid without an audience level", () => {
      expect(schema.parse(post).audience_level).toBeUndefined();
    });

    it("rejects misspelled audience levels", () => {
      expect(
        schema.safeParse({ ...post, audience_level: "begginer" }).success,
      ).toBe(false);
    });
  },
);

describe("audience badge", () => {
  it("shows Everyone when metadata is absent", () => {
    expect(renderToStaticMarkup(AudienceBadge({}))).toContain("Everyone");
  });
  it("shows Beginner for beginner posts", () => {
    expect(
      renderToStaticMarkup(AudienceBadge({ level: "beginner" })),
    ).toContain("Beginner");
  });
});
