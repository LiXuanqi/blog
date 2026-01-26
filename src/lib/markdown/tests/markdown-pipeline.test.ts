import path from "path";
import { fileURLToPath } from "url";
import { describe, it, expect } from "vitest";
import { LocalFileSystemConnector } from "../connectors/local-fs-connecter";
import { buildCollectionsFromSourcesAsync } from "../markdown-pipeline";
import { BLOG_FRONTMATTER_SCHEMA } from "../core/frontmatter";
import { ContentCollectionId } from "../core/types";

const FIXTURES_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "__fixtures__",
);

describe("#buildCollectionsFromSources", () => {
  it("basic", async () => {
    const sources = [
      {
        id: "blogs" as ContentCollectionId,
        connector: new LocalFileSystemConnector({
          contentDir: path.join(FIXTURES_DIR, "blogs"),
          sourceId: "blogs",
        }),
        frontmatterSchema: BLOG_FRONTMATTER_SCHEMA,
      },
    ];
    const collections = await buildCollectionsFromSourcesAsync(sources);
    console.log(collections);

    expect(collections[0].collection.getList()).toContainEqual({
      slug: "hello-world",
      title: "Hello world",
      date: "2018-11-25",
    });
  });
});
