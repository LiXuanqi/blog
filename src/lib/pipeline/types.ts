import { PipelineContext } from "./context";

/**
 * A single step in the pipeline
 */
export interface PipelineStep<TOutput = unknown> {
  id: string;
  name?: string;
  description?: string;
  execute(context: PipelineContext): Promise<TOutput> | TOutput;
}

/**
 * Pipeline execution result
 */
export interface PipelineResult {
  success: boolean;
  executedSteps: string[];
  failedStep?: string;
  error?: Error;
  context: PipelineContext;
  duration: number;
}

/**
 * Pipeline configuration
 */
export interface Pipeline {
  steps: PipelineStep[];
}

/**
 * Step execution result
 */
export interface StepResult<T = unknown> {
  stepId: string;
  success: boolean;
  output?: T;
  error?: Error;
  duration: number;
}
