import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { yamlProvider } from "@resume-sdk/core/providers";
import config from "../../resume.config.mjs";

const requirePdf = createRequire(import.meta.resolve("@resume-sdk/cli/pdf"));
const { chromium } = requirePdf("playwright");
const base = process.env.RESUME_TEST_URL || "http://127.0.0.1:3140";
const { resume: source } = await yamlProvider.load(
  await readFile(config.source, "utf8"),
);
const collections = {
  education: source.education,
  work: source.work,
  projects: source.projects,
};
const bullets = config.options.sections.flatMap((section) =>
  (collections[section] || []).flatMap((item) => item.highlights ?? []),
);
const plain = (text) =>
  text
    .replace(/(?<!\\)\*{1,2}/g, "")
    .replace(/\\([\\`*_\[\]])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
const output = process.env.RESUME_TEST_SCREENSHOTS;
if (output) await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const legacy = await page.request.get(`${base}/resume-online`, {
    maxRedirects: 0,
  });
  assert.equal(legacy.status(), 308);
  assert.equal(legacy.headers().location, "/resume");
  const response = await page.goto(`${base}/resume`);
  assert.equal(response.status(), 200);
  await page
    .getByRole("heading", { name: source.basics.name, exact: true })
    .waitFor();
  assert.equal(await page.locator("[data-resume-sdk]").count(), 1);
  assert.deepEqual(
    (await page.locator("[data-resume-sdk] li").allTextContents()).map(plain),
    bullets.map(plain),
  );
  await page.getByRole("link", { name: "Back to Home" }).waitFor();
  await page.getByRole("link", { name: "Read my blog" }).waitFor();
  const download = page.getByRole("link", { name: "Download PDF" });
  assert.equal(await download.getAttribute("href"), "/resume.pdf");
  const pendingDownload = page.waitForEvent("download");
  await download.click();
  const downloaded = await pendingDownload;
  assert.equal(await downloaded.failure(), null);
  assert.deepEqual(
    await readFile(await downloaded.path()),
    await readFile("public/resume.pdf"),
  );
  const pdf = await page.request.get(`${base}/resume.pdf`);
  assert.equal(pdf.status(), 200);
  assert.match(pdf.headers()["content-type"], /application\/pdf/);
  assert.deepEqual(await pdf.body(), await readFile("public/resume.pdf"));
  assert.equal((await pdf.body()).subarray(0, 5).toString(), "%PDF-");
  if (output)
    await page.screenshot({
      path: resolve(output, "desktop.png"),
      fullPage: true,
    });
  await page.setViewportSize({ width: 390, height: 844 });
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  if (output)
    await page.screenshot({
      path: resolve(output, "mobile.png"),
      fullPage: true,
    });
  await page.emulateMedia({ media: "print" });
  assert.equal(await download.isVisible(), false);
  assert.equal(
    await page.getByRole("link", { name: "Back to Home" }).isVisible(),
    false,
  );
  assert.equal(
    await page.getByRole("link", { name: "Read my blog" }).isVisible(),
    false,
  );
  assert.deepEqual(errors, []);
  console.log(
    `Verified /resume, ${bullets.length} source bullets, PDF download bytes, mobile width, and print controls using installed Playwright.`,
  );
} finally {
  await browser.close();
}
