import type { CollectionPlugin, PipelineDocument } from "./types.ts";
import { withAvailableLanguages } from "./available-languages-decorator.ts";

export function availableLanguagesPlugin(): CollectionPlugin {
  return {
    name: "available-languages",
    apply(documents: PipelineDocument[]): PipelineDocument[] {
      return withAvailableLanguages(documents as never[]) as PipelineDocument[];
    },
  };
}

export function visibleContentPlugin(
  nodeEnv = process.env.NODE_ENV,
): CollectionPlugin {
  return {
    name: "visible-content",
    apply(documents: PipelineDocument[]): PipelineDocument[] {
      if (nodeEnv !== "production") {
        return documents;
      }

      return documents.filter(
        (document) => document.frontmatter?.visible === true,
      );
    },
  };
}
