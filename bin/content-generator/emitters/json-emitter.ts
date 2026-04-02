import fs from "fs/promises";
import path from "path";
import { toCanonicalSlug } from "../available-languages-decorator.ts";
import type {
  CollectionEmitter,
  GeneratedCollection,
  IndexListItem,
} from "../types.ts";

export class JsonCollectionEmitter implements CollectionEmitter {
  public readonly name = "json";

  async emit(
    collection: GeneratedCollection,
    outputDir: string,
  ): Promise<IndexListItem[]> {
    const indexItems: IndexListItem[] = [];

    for (const document of collection.documents) {
      const canonicalSlug = toCanonicalSlug(document.slug, document.language);
      const outputFilePath = path.join(
        outputDir,
        collection.id,
        document.language,
        `${canonicalSlug}.json`,
      );

      await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
      await fs.writeFile(
        outputFilePath,
        JSON.stringify(
          {
            version: 1,
            collection: collection.id,
            slug: canonicalSlug,
            language: document.language,
            availableLanguages: document.availableLanguages ?? [],
            frontmatter: document.frontmatter,
            content: document.content,
            tocItems: document.tocItems ?? [],
          },
          null,
          2,
        ),
        "utf8",
      );

      indexItems.push({
        slug: canonicalSlug,
        title: String(document.frontmatter.title),
        date:
          typeof document.frontmatter.date === "string"
            ? document.frontmatter.date
            : "",
        language: document.language,
        availableLanguages: document.availableLanguages ?? [],
        description:
          typeof document.frontmatter.description === "string"
            ? document.frontmatter.description
            : undefined,
        category:
          typeof document.frontmatter.category === "string"
            ? document.frontmatter.category
            : undefined,
        url:
          typeof document.frontmatter.url === "string"
            ? document.frontmatter.url
            : undefined,
        directLink:
          typeof document.frontmatter.directLink === "boolean"
            ? document.frontmatter.directLink
            : undefined,
      });
    }

    return indexItems;
  }
}
