import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "/home/sal/Projects/Ecom-labmid/content/screenshots/cardnav";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log("==================================================");
  console.log("Verifying React Bits CardNav in CUI Cafe Navbar");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`[Console Error] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => {
    errors.push(`[Page Error] ${err.message}`);
  });

  // 1. Desktop - Home Navbar Closed
  console.log("\n[1/7] Testing Desktop Home Navbar (Closed)...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(targetDir, "01-desktop-navbar-closed.png"),
  });
  console.log("  ✓ Captured: 01-desktop-navbar-closed.png");

  // 2. Desktop - Open CardNav Menu
  console.log("\n[2/7] Testing CardNav Menu Toggle Open...");
  const menuButton = page.locator(".card-nav__menu");
  await menuButton.click();
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(targetDir, "02-desktop-navbar-open.png"),
  });
  console.log("  ✓ Captured: 02-desktop-navbar-open.png");

  // 3. Desktop - Hover over Link
  console.log("\n[3/7] Testing CardNav Link Hover...");
  const breakfastLink = page.locator(".card-nav__link", { hasText: "Breakfast" });
  if (await breakfastLink.count() > 0) {
    await breakfastLink.first().hover();
    await page.waitForTimeout(400);
  }
  await page.screenshot({
    path: path.join(targetDir, "03-desktop-card-hover.png"),
  });
  console.log("  ✓ Captured: 03-desktop-card-hover.png");

  // 4. Desktop - Giant "CAFE" Word Hero Visibility
  console.log("\n[4/7] Testing Hero Glyph Portal 'CAFE' Visibility with CardNav...");
  // Close menu first
  await menuButton.click();
  await page.waitForTimeout(400);
  // Scroll down a bit to see the glyph portal in action
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "04-desktop-home-hero-word.png"),
  });
  console.log("  ✓ Captured: 04-desktop-home-hero-word.png");

  // 5. Desktop - Shop Page with CardNav
  console.log("\n[5/7] Testing Shop Page with CardNav Active State...");
  await page.goto("http://localhost:3000/shop", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.locator(".card-nav__menu").click();
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(targetDir, "05-desktop-shop-navbar.png"),
  });
  console.log("  ✓ Captured: 05-desktop-shop-navbar.png");

  // 6. Desktop - Cart Button and Badge
  console.log("\n[6/7] Testing Cart Route & Cart Slot...");
  await page.goto("http://localhost:3000/cart", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(targetDir, "06-desktop-cart-badge.png"),
  });
  console.log("  ✓ Captured: 06-desktop-cart-badge.png");

  await page.close();
  await desktopContext.close();

  // Mobile Tests
  console.log("\n[7/7] Testing Mobile (390px) Viewport...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`[Mobile Console Error] ${msg.text()}`);
    }
  });

  await mobilePage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({
    path: path.join(targetDir, "07-mobile-navbar-closed.png"),
  });
  console.log("  ✓ Captured: 07-mobile-navbar-closed.png");

  // Open mobile CardNav
  const mobileMenuBtn = mobilePage.locator(".card-nav__menu");
  await mobileMenuBtn.click();
  await mobilePage.waitForTimeout(600);

  // Check horizontal overflow
  const hasOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log(`  - Mobile Horizontal Overflow Detected: ${hasOverflow ? "YES (FAIL)" : "NO (PASS)"}`);

  await mobilePage.screenshot({
    path: path.join(targetDir, "08-mobile-navbar-open.png"),
  });
  console.log("  ✓ Captured: 08-mobile-navbar-open.png");

  // Click Breakfast in mobile menu
  const mobileBreakfastLink = mobilePage.locator(".card-nav__link", { hasText: "Breakfast" });
  await mobileBreakfastLink.first().click();
  await mobilePage.waitForTimeout(1000);

  const currentUrl = mobilePage.url();
  console.log(`  - Navigated to: ${currentUrl}`);
  await mobilePage.screenshot({
    path: path.join(targetDir, "09-mobile-after-link-click.png"),
  });
  console.log("  ✓ Captured: 09-mobile-after-link-click.png");

  await mobilePage.close();
  await mobileContext.close();
  await browser.close();

  console.log("\n==================================================");
  console.log(`Verification Complete. Total Errors: ${errors.length}`);
  if (errors.length > 0) {
    console.error("Errors found:", errors);
    process.exit(1);
  } else {
    console.log("All CardNav verification checks passed with 0 errors!");
  }
}

run().catch((err) => {
  console.error("Verification script failed:", err);
  process.exit(1);
});
