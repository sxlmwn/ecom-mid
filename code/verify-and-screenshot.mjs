import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "/home/sal/Projects/Ecom-labmid/content/screenshots/step-01";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const routes = [
  { name: "home", path: "/" },
  { name: "shop", path: "/shop" },
  { name: "breakfast", path: "/breakfast" },
  { name: "lunch", path: "/lunch" },
  { name: "fast-food", path: "/fast-food" },
  { name: "stationery", path: "/stationery" },
  { name: "cart", path: "/cart" },
  { name: "contact", path: "/contact" },
  { name: "product", path: "/product/special-chai-combo" },
];

async function run() {
  console.log("Launching Chromium browser for verification...");
  const browser = await chromium.launch({ headless: true });

  const consoleErrors = [];

  // 1. Desktop captures (1440 x 900)
  console.log("--- Capturing Desktop Screenshots (1440px) ---");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();

  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Desktop Console Error] ${msg.text()}`);
    }
  });

  desktopPage.on("pageerror", (err) => {
    consoleErrors.push(`[Desktop Page Error] ${err.message}`);
  });

  for (const r of routes) {
    const url = `http://localhost:3000${r.path}`;
    console.log(`Navigating desktop: ${url}`);
    const response = await desktopPage.goto(url, { waitUntil: "networkidle" });
    if (!response || response.status() >= 400) {
      throw new Error(`HTTP Error ${response?.status()} on ${url}`);
    }
    const outputPath = path.join(targetDir, `${r.name}-desktop.png`);
    await desktopPage.screenshot({ path: outputPath, fullPage: true });
    console.log(`Saved: ${outputPath}`);
  }
  await desktopContext.close();

  // 2. Mobile captures (390 x 844)
  console.log("--- Capturing Mobile Screenshots (390px) ---");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();

  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Mobile Console Error] ${msg.text()}`);
    }
  });

  mobilePage.on("pageerror", (err) => {
    consoleErrors.push(`[Mobile Page Error] ${err.message}`);
  });

  for (const r of routes) {
    const url = `http://localhost:3000${r.path}`;
    console.log(`Navigating mobile: ${url}`);
    const response = await mobilePage.goto(url, { waitUntil: "networkidle" });
    if (!response || response.status() >= 400) {
      throw new Error(`HTTP Error ${response?.status()} on ${url}`);
    }
    const outputPath = path.join(targetDir, `${r.name}-mobile.png`);
    await mobilePage.screenshot({ path: outputPath, fullPage: true });
    console.log(`Saved: ${outputPath}`);
  }

  // 3. Mobile Menu Open
  console.log("--- Capturing Mobile Menu Open (390px) ---");
  await mobilePage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const toggleBtn = mobilePage.locator('[data-testid="mobile-menu-toggle"]');
  await toggleBtn.click();
  await mobilePage.waitForSelector('[data-testid="mobile-menu-dropdown"]');
  await mobilePage.waitForTimeout(300); // Allow animation to settle

  const menuOutputPath = path.join(targetDir, "mobile-menu-open.png");
  await mobilePage.screenshot({ path: menuOutputPath });
  console.log(`Saved: ${menuOutputPath}`);

  await mobileContext.close();
  await browser.close();

  console.log("==========================================");
  console.log(`Verification Complete!`);
  console.log(`Console Errors encountered: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("Errors found:", consoleErrors);
    process.exit(1);
  } else {
    console.log("All routes returned 200 OK with 0 console errors!");
  }
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
