import { PipelineExecutor, type PipelineSteps } from "@1_x7/pipeline";

type Ctx = {
  rawFiles: string[];
  ast: { ok: boolean };
};

export function runPipeline() {
  const executor = PipelineExecutor<Ctx>();
  const steps: PipelineSteps<Ctx> = [
    {
      id: "readFiles",
      execute: () => ({
        rawFiles: ["a.md"],
      }),
    },
  ];
  const context = executor.run(steps);
  console.log(context);
}
