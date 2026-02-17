import { runContentGeneratorAsync } from "./index.ts";

async function main() {
  try {
    console.log("[content-generator] cli");
    await runContentGeneratorAsync();
  } catch (error) {
    console.error("[content-generator] failed");
    console.error(error);
    process.exit(1);
  }
}

void main();
