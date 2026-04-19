import path from "path";
import {
  BLOG_FRONTMATTER_SCHEMA,
  LINK_FRONTMATTER_SCHEMA,
} from "./frontmatter.ts";
import { LocalFileSystemConnector } from "./loaders/local-fs-loader.ts";
import {
  availableLanguagesPlugin,
  visibleContentPlugin,
} from "./collection-plugins.ts";
import {
  frontmatterPlugin,
  languagePlugin,
  tocPlugin,
} from "./document-plugins.ts";
import { JsonCollectionEmitter } from "./emitters/json-emitter.ts";
import type { CollectionConfig } from "./types.ts";

export const OUTPUT_DIR = path.join(process.cwd(), "src/generated/content");
export const TEMP_OUTPUT_DIR = path.join(
  process.cwd(),
  "src/generated/.content-tmp",
);
export const CONTENT_WATCH_PATHS = [
  path.join(process.cwd(), "content/posts"),
  path.join(process.cwd(), "content/links"),
];

const jsonEmitter = new JsonCollectionEmitter();

export const COLLECTION_CONFIGS: CollectionConfig[] = [
  {
    id: "posts",
    loader: new LocalFileSystemConnector({
      contentDir: path.join(process.cwd(), "content/posts"),
      sourceId: "posts",
    }),
    documentPlugins: [
      frontmatterPlugin(BLOG_FRONTMATTER_SCHEMA),
      languagePlugin(),
      tocPlugin(),
    ],
    collectionPlugins: [visibleContentPlugin(), availableLanguagesPlugin()],
    emitter: jsonEmitter,
  },
  {
    id: "links",
    loader: new LocalFileSystemConnector({
      contentDir: path.join(process.cwd(), "content/links"),
      sourceId: "links",
    }),
    documentPlugins: [
      frontmatterPlugin(LINK_FRONTMATTER_SCHEMA),
      languagePlugin(),
      tocPlugin(),
    ],
    collectionPlugins: [visibleContentPlugin(), availableLanguagesPlugin()],
    emitter: jsonEmitter,
  },
];
