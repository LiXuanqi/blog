import { describe, it, expect } from "vitest";
import { PipelineExecutor } from "./executor";
import { Pipeline, PipelineStep } from "./types";

describe("PipelineExecutor", () => {
  const executor = new PipelineExecutor();

  describe("execute", () => {
    it("executes a single step successfully", async () => {
      const step: PipelineStep = {
        id: "test-step",
        execute: async () => "test result",
      };

      const pipeline: Pipeline = { steps: [step] };
      const result = await executor.execute(pipeline);

      expect(result.success).toBe(true);
      expect(result.executedSteps).toEqual(["test-step"]);
      expect(result.context.get("test-step")).toBe("test result");
      expect(result.duration).toBeGreaterThanOrEqual(0);
      expect(result.error).toBeUndefined();
      expect(result.failedStep).toBeUndefined();
    });

    it("executes multiple steps in sequence", async () => {
      const steps: PipelineStep[] = [
        {
          id: "step-1",
          execute: async () => 10,
        },
        {
          id: "step-2",
          execute: async (context) => {
            const value = context.get("step-1");
            return value * 2;
          },
        },
        {
          id: "step-3",
          execute: async (context) => {
            const value = context.get("step-2");
            return value + 5;
          },
        },
      ];

      const pipeline: Pipeline = { steps };
      const result = await executor.execute(pipeline);

      expect(result.success).toBe(true);
      expect(result.executedSteps).toEqual(["step-1", "step-2", "step-3"]);
      expect(result.context.get("step-1")).toBe(10);
      expect(result.context.get("step-2")).toBe(20);
      expect(result.context.get("step-3")).toBe(25);
    });

    it("executes pipeline with empty steps", async () => {
      const pipeline: Pipeline = { steps: [] };
      const result = await executor.execute(pipeline);

      expect(result.success).toBe(true);
      expect(result.executedSteps).toEqual([]);
      expect(result.duration).toBeGreaterThanOrEqual(0);
    });

    it("handles step execution error", async () => {
      const steps: PipelineStep[] = [
        {
          id: "good-step",
          execute: async () => "success",
        },
        {
          id: "failing-step",
          execute: async () => {
            throw new Error("Step failed");
          },
        },
        {
          id: "never-executed",
          execute: async () => "never reached",
        },
      ];

      const pipeline: Pipeline = { steps };
      const result = await executor.execute(pipeline);

      expect(result.success).toBe(false);
      expect(result.executedSteps).toEqual(["good-step"]);
      expect(result.failedStep).toBe("good-step");
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain(
        'Step "failing-step" failed: Step failed',
      );
      expect(result.context.get("good-step")).toBe("success");
      expect(result.context.has("failing-step")).toBe(false);
      expect(result.context.has("never-executed")).toBe(false);
    });

    it("rejects duplicate step IDs", async () => {
      const steps: PipelineStep[] = [
        {
          id: "duplicate-id",
          execute: async () => "first",
        },
        {
          id: "duplicate-id",
          execute: async () => "second",
        },
      ];

      const pipeline: Pipeline = { steps };
      const result = await executor.execute(pipeline);

      expect(result.success).toBe(false);
      expect(result.executedSteps).toEqual([]);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain(
        'Duplicate step ID: "duplicate-id"',
      );
    });

    it("works with synchronous step execution", async () => {
      const step: PipelineStep = {
        id: "sync-step",
        execute: () => "synchronous result",
      };

      const pipeline: Pipeline = { steps: [step] };
      const result = await executor.execute(pipeline);

      expect(result.success).toBe(true);
      expect(result.context.get("sync-step")).toBe("synchronous result");
    });

    it("handles steps with optional metadata", async () => {
      const step: PipelineStep = {
        id: "metadata-step",
        name: "Test Step",
        description: "A step with metadata",
        execute: async () => "result",
      };

      const pipeline: Pipeline = { steps: [step] };
      const result = await executor.execute(pipeline);

      expect(result.success).toBe(true);
      expect(result.context.get("metadata-step")).toBe("result");
    });
  });
});
