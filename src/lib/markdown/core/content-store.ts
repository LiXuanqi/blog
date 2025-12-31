import { MarkdownCollection } from "./markdown-collection";

/**
 * Global content store that holds processed markdown collections
 */
class ContentStore {
  private collections = new Map<string, MarkdownCollection>();
  private initialized = false;

  /**
   * Register a collection in the store
   */
  register(name: string, collection: MarkdownCollection): void {
    this.collections.set(name, collection);
  }

  /**
   * Get a collection from the store
   */
  get(name: string): MarkdownCollection | null {
    return this.collections.get(name) || null;
  }

  /**
   * Check if the store has been initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Mark the store as initialized
   */
  markInitialized(): void {
    this.initialized = true;
  }

  /**
   * Get all registered collection names
   */
  getCollectionNames(): string[] {
    return Array.from(this.collections.keys());
  }

  /**
   * Clear all collections (useful for testing)
   */
  clear(): void {
    this.collections.clear();
    this.initialized = false;
  }
}

// Export a singleton instance
export const contentStore = new ContentStore();
