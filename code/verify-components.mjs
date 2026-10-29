import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "/home/sal/Projects/Ecom-labmid/content/screenshots/components";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log("==================================================");
  console.log("Verifying 6 Newly Integrated UI Components");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 950 },
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

  // 1. Home - FlipCard (Campus Combos)
  console.log("\n[1/6] Testing FlipCard on Home Page...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const combosSection = page.locator("section:has-text('Campus Secret Perk Deals')");
  await combosSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(targetDir, "01-home-flipcard-section.png"),
  });
  console.log("  ✓ Captured: 01-home-flipcard-section.png");

  // 2. Shop - DriftWall (Campus Dining Stream)
  console.log("\n[2/6] Testing DriftWall on Shop Page...");
  await page.goto("http://localhost:3000/shop", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const driftSection = page.locator("section:has-text('Live Campus Dining Stream')");
  await driftSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(targetDir, "02-shop-driftwall-stream.png"),
  });
  console.log("  ✓ Captured: 02-shop-driftwall-stream.png");

  // 3. Shop - Expandable Cards (Chef's Handcrafted Specials)
  console.log("\n[3/6] Testing ExpandableCardDemo on Shop Page...");
  const expandableSection = page.locator("section:has-text(\"Chef's Handcrafted Specials\")");
  await expandableSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(targetDir, "03-shop-expandable-cards-grid.png"),
  });
  console.log("  ✓ Captured: 03-shop-expandable-cards-grid.png");

  // Test expanding the first card (Dum Biryani)
  console.log("  → Clicking 'Dum Biryani Special Pot' to expand...");
  const biryaniCard = page.locator("text=Dum Biryani Special Pot").first();
  await biryaniCard.click();
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(targetDir, "03b-shop-expandable-card-open.png"),
  });
  console.log("  ✓ Captured: 03b-shop-expandable-card-open.png");

  // Close modal via Escape key
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // 4. Beverages - InfiniteSpiral (The Infinite Brew Spiral)
  console.log("\n[4/6] Testing InfiniteSpiral on Beverages Page...");
  await page.goto("http://localhost:3000/beverages", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const spiralSection = page.locator("section:has-text('The Infinite Brew Spiral')");
  await spiralSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(targetDir, "04-beverages-infinitespiral.png"),
  });
  console.log("  ✓ Captured: 04-beverages-infinitespiral.png");

  // 5. Fast Food - Masonry (Crispy Campus Visual Feast)
  console.log("\n[5/6] Testing Masonry on Fast Food Page...");
  await page.goto("http://localhost:3000/fast-food", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const masonrySection = page.locator("section:has-text('Crispy Campus Visual Feast')");
  await masonrySection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(targetDir, "05-fastfood-masonry-gallery.png"),
  });
  console.log("  ✓ Captured: 05-fastfood-masonry-gallery.png");

  // Test clicking one card to open lightbox
  console.log("  → Clicking first item in Masonry gallery for lightbox...");
  const firstMasonryItem = page.locator(".masonry__item").first();
  if (await firstMasonryItem.count() > 0) {
    await firstMasonryItem.click();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(targetDir, "05b-fastfood-masonry-lightbox.png"),
    });
    console.log("  ✓ Captured: 05b-fastfood-masonry-lightbox.png");
    // Close lightbox
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
  }

  // 6. Contact - DomeGallery (360° Campus Atmosphere)
  console.log("\n[6/6] Testing DomeGallery on Contact Page...");
  await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  const domeSection = page.locator("section:has-text('Experience the CUI Cafe Campus Vibe')");
  await domeSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(targetDir, "06-contact-domegallery.png"),
  });
  console.log("  ✓ Captured: 06-contact-domegallery.png");

  await browser.close();

  console.log("\n==================================================");
  console.log(`Verification Complete. Encountered ${errors.length} errors.`);
  if (errors.length > 0) {
    console.log("Errors encountered:\n", errors.join("\n"));
  }
  console.log("==================================================");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
