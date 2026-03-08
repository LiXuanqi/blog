import fs from "fs";
import path from "path";
import type { MarkdownConnector, RawMarkdownDocument } from "../types.ts";

type LocalFileSystemConnectorConfig = {
  contentDir: string;
  sourceId: string;
};

export class LocalFileSystemConnector implements MarkdownConnector {
  private contentDir: string;
  private sourceId: string;

  constructor({ contentDir, sourceId }: LocalFileSystemConnectorConfig) {
    this.contentDir = contentDir;
    this.sourceId = sourceId;
  }

  public async getAll(): Promise<RawMarkdownDocument[]> {
    if (!fs.existsSync(this.contentDir)) {
      return [];
    }

    const fileNames = fs.readdirSync(this.contentDir);
    return fileNames
      .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
      .map((fileName) => {
        const slug = path.basename(fileName, path.extname(fileName));
        const fullPath = path.join(this.contentDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        return {
          slug,
          content: fileContents,
          source: "local",
          sourceId: this.sourceId,
        };
      });
  }
}
