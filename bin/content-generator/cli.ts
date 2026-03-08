import chokidar from "chokidar";
import { CONTENT_WATCH_PATHS } from "./config.ts";
import { getContentGenerationMode, runContentGeneratorAsync } from "./index.ts";

const REBUILD_DEBOUNCE_MS = 150;

async function main() {
  const mode = getContentGenerationMode();
  const isWatchMode = process.argv.includes("--watch");
  console.log(
    `[content-generator] cli (${mode}${isWatchMode ? ", watch" : ""})`,
  );

  if (isWatchMode) {
    await runWatchModeAsync();
    return;
  }

  await runGenerateOnceOrExitAsync();
}

void main();

async function runGenerateOnceOrExitAsync() {
  try {
    await runContentGeneratorAsync();
  } catch (error) {
    console.error("[content-generator] failed");
    console.error(error);
    process.exit(1);
  }
}

async function runWatchModeAsync() {
  await runGenerateWithRecoveryAsync("initial");

  const watcher = chokidar.watch(CONTENT_WATCH_PATHS, {
    ignoreInitial: true,
    ignored: (filePath, stats) => {
      if (stats?.isFile()) {
        if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) {
          return true;
        }
      }

      return (
        /(^|[/\\])\../.test(filePath) ||
        /node_modules/.test(filePath) ||
        /\/\.next\//.test(filePath) ||
        /\/src\/generated\//.test(filePath) ||
        /~$/.test(filePath) ||
        /\.swp$/.test(filePath) ||
        /\.tmp$/.test(filePath)
      );
    },
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 25,
    },
  });

  console.log("[content-generator] watch active (development)");
  for (const watchPath of CONTENT_WATCH_PATHS) {
    console.log(`[content-generator] watching ${watchPath}`);
  }

  let debounceTimer: NodeJS.Timeout | null = null;
  let pendingReason = "content change";

  const scheduleRebuild = (event: string, filePath: string) => {
    pendingReason = `${event}: ${filePath}`;
    console.log(`[content-generator] change detected (${pendingReason})`);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      void runGenerateWithRecoveryAsync(pendingReason);
    }, REBUILD_DEBOUNCE_MS);
  };

  watcher
    .on("add", (filePath) => scheduleRebuild("add", filePath))
    .on("change", (filePath) => scheduleRebuild("change", filePath))
    .on("unlink", (filePath) => scheduleRebuild("unlink", filePath))
    .on("error", (error) => {
      console.error("[content-generator] watch error");
      console.error(error);
    });

  await new Promise<void>(() => {});
}

async function runGenerateWithRecoveryAsync(reason: string) {
  try {
    console.log(`[content-generator] regenerating (${reason})`);
    await runContentGeneratorAsync();
    console.log(`[content-generator] regeneration completed (${reason})`);
  } catch (error) {
    console.error(`[content-generator] regeneration failed (${reason})`);
    console.error(error);
  }
}
