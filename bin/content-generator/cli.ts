import { runContentGeneratorAsync } from "./index.ts";

async function main() {
  try {
    const mode =
      process.env.NODE_ENV === "production" ? "production" : "development";
    console.log(`[content-generator] cli (${mode})`);
    await runContentGeneratorAsync();
  } catch (error) {
    console.error("[content-generator] failed");
    console.error(error);
    process.exit(1);
  }
}

void main();
