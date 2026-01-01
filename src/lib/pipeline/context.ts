/**
 * Context for sharing data between pipeline steps
 */
export class PipelineContext {
  private data = new Map<string, unknown>();

  get<T>(stepId: string): T {
    const value = this.data.get(stepId);
    if (value === undefined) {
      throw new Error(`No data found for step: ${stepId}`);
    }
    return value as T;
  }

  set<T>(stepId: string, data: T): void {
    this.data.set(stepId, data);
  }

  has(stepId: string): boolean {
    return this.data.has(stepId);
  }

  getAll(): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of this.data.entries()) {
      result[key] = value;
    }
    return result;
  }

  /**
   * Get data safely without throwing error
   */
  getSafe<T>(stepId: string): T | undefined {
    return this.data.get(stepId) as T | undefined;
  }

  /**
   * Clear all data
   */
  clear(): void {
    this.data.clear();
  }

  /**
   * Get all step IDs that have data
   */
  getStepIds(): string[] {
    return Array.from(this.data.keys());
  }
}
