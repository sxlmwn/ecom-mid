import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "/home/sal/Projects/Ecom-labmid/content/screenshots/hero-furniture";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log("==================================================");
  console.log("Verifying 09-cafe-furniture.jpg & Glyph Text Component Hero");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });

  const errors = [];
  const recordErrors = (page) => {
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(`[Console Error] ${msg.text()}`);
      }
    });
    page.on("pageerror", (err) => {
      errors.push(`[Page Error] ${err.message}`);
    });
  };

  // 1. Desktop - Hero Initial / Closed State (1440x900)
  console.log("\n[1/5] Capturing Desktop Hero Initial State (Closed)...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();
  recordErrors(page);

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: path.join(targetDir, "01-desktop-hero-closed.png"),
  });
  console.log("  ✓ Captured: 01-desktop-hero-closed.png");

  // 2. Desktop - Hero Mid-Zoom State
  console.log("\n[2/5] Scrolling halfway through the Glyph Portal (mid-zoom)...");
  await page.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 1.2, behavior: "instant" });
  });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(targetDir, "02-desktop-hero-midzoom.png"),
  });
  console.log("  ✓ Captured: 02-desktop-hero-midzoom.png");

  // 3. Desktop - Hero Revealed / Inside State (Fully inside 4K cafe furniture)
  console.log("\n[3/5] Scrolling to fully reveal 4K cafe furniture & slipstream copy...");
  await page.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 2.5, behavior: "instant" });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(targetDir, "03-desktop-hero-revealed.png"),
  });
  console.log("  ✓ Captured: 03-desktop-hero-revealed.png");

  // 4. Mobile - Hero Closed State (390x844)
  console.log("\n[4/5] Capturing Mobile Hero Initial State (390x844)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  recordErrors(mobilePage);

  await mobilePage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1500);

  await mobilePage.screenshot({
    path: path.join(targetDir, "04-mobile-hero-closed.png"),
  });
  console.log("  ✓ Captured: 04-mobile-hero-closed.png");

  // 5. Mobile - Hero Revealed State
  console.log("\n[5/5] Capturing Mobile Hero Revealed State...");
  await mobilePage.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 2.5, behavior: "instant" });
  });
  await mobilePage.waitForTimeout(1000);

  await mobilePage.screenshot({
    path: path.join(targetDir, "05-mobile-hero-revealed.png"),
  });
  console.log("  ✓ Captured: 05-mobile-hero-revealed.png");

  await browser.close();

  console.log("\n==================================================");
  if (errors.length > 0) {
    console.log(`Encountered ${errors.length} browser errors:`);
    errors.forEach((e) => console.log(`  - ${e}`));
  } else {
    console.log("All verifications passed with 0 console or runtime errors!");
  }
  console.log(`Screenshots saved to: ${targetDir}`);
  console.log("==================================================");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});