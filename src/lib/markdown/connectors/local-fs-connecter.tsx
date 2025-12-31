import fs from "fs";
import path from "path";
import { MarkdownConnector, RawMarkdownDocument } from "../core/types";

type LocalFileSystemConnectorConfig = {
  contentDir: string;
};

export class LocalFileSystemConnector implements MarkdownConnector {
  private _contentDir: string;

  constructor({ contentDir }: LocalFileSystemConnectorConfig) {
    this._contentDir = contentDir;
  }

  public async getAll(): Promise<RawMarkdownDocument[]> {
    if (!fs.existsSync(this._contentDir)) {
      return [];
    }

    const fileNames = fs.readdirSync(this._contentDir);
    const allPostsData = fileNames
      .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
      .map((fileName) => {
        const slug = path.basename(fileName, path.extname(fileName));
        const fullPath = path.join(this._contentDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        return {
          slug,
          content: fileContents,
          source: "local" as const,
        };
      });

    return allPostsData;
  }

  public async getBySlug(slug: string): Promise<RawMarkdownDocument | null> {
    const possibleFiles = [`${slug}.mdx`, `${slug}.md`];

    for (const fileName of possibleFiles) {
      const fullPath = path.join(this._contentDir, fileName);
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, "utf8");

        return {
          slug,
          content: fileContents,
          source: "local" as const,
        };
      }
    }

    return null;
  }
}
