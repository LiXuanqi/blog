import { contentStore } from "./core/content-store";
import { runMarkdownPipelineAsync } from "./markdown-pipeline";

/**
 * Initialize the content store with processed markdown collections using pipeline
 */
export async function initializeContentStoreAsync(): Promise<void> {
  if (contentStore.isInitialized()) {
    return; // Already initialized
  }

  try {
    await runMarkdownPipelineAsync();

    contentStore.markInitialized();

    console.log(contentStore.get("blogs")?.getList());
  } catch (error) {
    console.error("Failed to initialize content store:", error);
  }
}
