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
