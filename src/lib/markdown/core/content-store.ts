import { MarkdownCollection } from "./markdown-collection";
import { ContentCollectionId } from "./types";

/**
 * Type registry for content store - add new types here
 */
interface ContentTypeRegistry {
  blogs: MarkdownCollection;
  notes: MarkdownCollection;
  // Add more types as needed
  // config: SiteConfig;
  // metadata: Record<string, any>;
}

/**
 * Type-safe global content store
 */
class ContentStore {
  private collections = new Map<
    ContentCollectionId,
    ContentTypeRegistry[ContentCollectionId]
  >();
  private initialized = false;

  /**
   * Register data in the store with type safety
   */
  register<K extends ContentCollectionId>(
    name: K,
    data: ContentTypeRegistry[K],
  ): void {
    this.collections.set(name, data);
  }

  /**
   * Get data from the store with type safety
   */
  get<K extends ContentCollectionId>(name: K): ContentTypeRegistry[K] | null {
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
  getCollectionNames(): ContentCollectionId[] {
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
