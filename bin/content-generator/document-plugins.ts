import type {
  DocumentPlugin,
  FrontmatterSchema,
  PipelineDocument,
} from "./types.ts";
import { withFrontmatter } from "./frontmatter-decorator.ts";
import { withLanguage } from "./language-decorator.ts";
import { extractTocFromMarkdown, processTocItems } from "./toc.ts";

export function frontmatterPlugin<TSchema extends FrontmatterSchema>(
  schema: TSchema,
): DocumentPlugin {
  return {
    name: "frontmatter",
    apply(document: PipelineDocument): PipelineDocument {
      return withFrontmatter(document, schema) as PipelineDocument;
    },
  };
}

export function languagePlugin(): DocumentPlugin {
  return {
    name: "language",
    apply(document: PipelineDocument): PipelineDocument {
      return withLanguage(document);
    },
  };
}

export function tocPlugin(): DocumentPlugin {
  return {
    name: "toc",
    apply(document: PipelineDocument): PipelineDocument {
      return {
        ...document,
        tocItems: processTocItems(extractTocFromMarkdown(document.content)),
      };
    },
  };
}
