import { ContentTypeRegistry } from "./content-types";
import { runMarkdownPipelineAsync } from "../markdown-pipeline";
import { ContentCollectionId } from "./types";

/**
 * Type-safe global content store
 */
export class ContentStore {
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

let contentStoreInstance: ContentStore | null = null;
let contentStoreInitPromise: Promise<ContentStore> | null = null;

export async function getContentStoreAsync(): Promise<ContentStore> {
  if (contentStoreInstance?.isInitialized()) {
    return contentStoreInstance;
  }

  const instance = contentStoreInstance ?? new ContentStore();
  contentStoreInstance = instance;

  if (!contentStoreInitPromise) {
    contentStoreInitPromise = (async () => {
      const collections = await runMarkdownPipelineAsync();
      for (const { id, collection } of collections) {
        instance.register(id, collection);
      }
      instance.markInitialized();
      return instance;
    })();
  }

  return contentStoreInitPromise;
}
