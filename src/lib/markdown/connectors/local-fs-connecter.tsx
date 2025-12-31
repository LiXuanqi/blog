import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MarkdownConnector, MarkdownDocument } from "../core/types";

type LocalFileSystemConnectorConfig = {
  contentDir: string;
};

export class LocalFileSystemConnector implements MarkdownConnector {
  private _contentDir: string;

  constructor({ contentDir }: LocalFileSystemConnectorConfig) {
    this._contentDir = contentDir;
  }

  public async getAll(): Promise<MarkdownDocument[]> {
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
        const { data, content } = matter(fileContents);
        const stats = fs.statSync(fullPath);

        return {
          slug,
          content,
          frontmatter: data,
          lastModified: stats.mtime,
          source: "local" as const,
        };
      });

    return allPostsData.sort((a, b) => {
      const dateA = a.frontmatter?.date || a.lastModified;
      const dateB = b.frontmatter?.date || b.lastModified;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }

  public async getBySlug(slug: string): Promise<MarkdownDocument | null> {
    const possibleFiles = [`${slug}.mdx`, `${slug}.md`];

    for (const fileName of possibleFiles) {
      const fullPath = path.join(this._contentDir, fileName);
      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        const stats = fs.statSync(fullPath);

        return {
          slug,
          content,
          frontmatter: data,
          lastModified: stats.mtime,
          source: "local" as const,
        };
      }
    }

    return null;
  }
}
