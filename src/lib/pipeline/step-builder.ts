import { PipelineStep, PipelineContext } from "./types";

/**
 * Builder for creating pipeline steps with a fluent API
 */
export class StepBuilder<TOutput = unknown> {
  private step: Partial<PipelineStep<TOutput>> = {};

  constructor(id: string) {
    this.step.id = id;
  }

  /**
   * Set the step name
   */
  name(name: string): StepBuilder<TOutput> {
    this.step.name = name;
    return this;
  }

  /**
   * Set the step description
   */
  description(description: string): StepBuilder<TOutput> {
    this.step.description = description;
    return this;
  }

  /**
   * Set the execution function
   */
  execute<T = TOutput>(
    fn: (context: PipelineContext) => Promise<T> | T,
  ): StepBuilder<T> {
    this.step.execute = fn;
    return this as StepBuilder<T>;
  }

  /**
   * Build the step
   */
  build(): PipelineStep<TOutput> {
    if (!this.step.execute) {
      throw new Error(`Step "${this.step.id}" must have an execute function`);
    }

    return this.step as PipelineStep<TOutput>;
  }
}

/**
 * Factory function for creating steps
 */
export function createStep(id: string): StepBuilder {
  return new StepBuilder(id);
}

/**
 * Utility functions for common step patterns
 */
export const StepUtils = {
  /**
   * Create a simple transformation step that reads from previous step
   */
  transform<TInput, TOutput>(
    id: string,
    fromStep: string,
    transformer: (input: TInput) => TOutput | Promise<TOutput>,
  ): PipelineStep<TOutput> {
    return createStep(id)
      .execute(async (context) => {
        const input = context.get<TInput>(fromStep);
        return await transformer(input);
      })
      .build();
  },

  /**
   * Create a step that filters data from previous step
   */
  filter<T>(
    id: string,
    fromStep: string,
    predicate: (item: T) => boolean,
  ): PipelineStep<T[]> {
    return createStep(id)
      .execute((context) => {
        const items = context.get<T[]>(fromStep);
        return items.filter(predicate);
      })
      .build();
  },

  /**
   * Create a step that sorts data from previous step
   */
  sort<T>(
    id: string,
    fromStep: string,
    compareFn: (a: T, b: T) => number,
  ): PipelineStep<T[]> {
    return createStep(id)
      .execute((context) => {
        const items = context.get<T[]>(fromStep);
        return [...items].sort(compareFn);
      })
      .build();
  },
};
