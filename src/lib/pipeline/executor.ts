import { PipelineStep, PipelineResult } from "./types";
import { PipelineContext } from "./context";

/**
 * Simple pipeline executor that runs steps in sequence
 */
export class PipelineExecutor {
  /**
   * Execute a list of steps in sequence
   */
  async execute(steps: PipelineStep[]): Promise<PipelineResult> {
    const startTime = Date.now();
    const context = new PipelineContext();
    const executedSteps: string[] = [];

    try {
      // Validate step IDs are unique
      this.validateSteps(steps);

      // Execute steps in order
      for (const step of steps) {
        await this.executeStep(step, context);
        executedSteps.push(step.id);
      }

      return {
        success: true,
        executedSteps,
        context,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      return {
        success: false,
        executedSteps,
        failedStep: executedSteps[executedSteps.length - 1],
        error: error as Error,
        context,
        duration: Date.now() - startTime,
      };
    }
  }

  /**
   * Execute a single step
   */
  private async executeStep(
    step: PipelineStep,
    context: PipelineContext,
  ): Promise<void> {
    try {
      // Execute the step
      const output = await step.execute(context);

      // Store result in context
      context.set(step.id, output);
    } catch (error) {
      throw new Error(`Step "${step.id}" failed: ${(error as Error).message}`);
    }
  }

  /**
   * Validate steps
   */
  private validateSteps(steps: PipelineStep[]): void {
    const stepIds = new Set();

    for (const step of steps) {
      if (stepIds.has(step.id)) {
        throw new Error(`Duplicate step ID: "${step.id}"`);
      }
      stepIds.add(step.id);
    }
  }
}
