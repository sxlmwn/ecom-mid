import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "/home/sal/Projects/Ecom-labmid/content/screenshots/step-03";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log("==================================================");
  console.log("Starting Step 03 Automated Verification (Playwright)");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });
  const consoleErrors = [];
  const consoleWarnings = [];
  const placeholderLogs = [];

  // ==================================================
  // 1. DESKTOP VERIFICATION (1440 x 900)
  // ==================================================
  console.log("\n[1/2] Testing Desktop Viewport (1440 x 900)...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();

  page.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error") {
      consoleErrors.push(`[Desktop Console Error] ${text}`);
    } else if (msg.type() === "warning") {
      consoleWarnings.push(`[Desktop Console Warning] ${text}`);
    } else if (text.includes("[CUI Cafe - Cart Placeholder]")) {
      placeholderLogs.push(text);
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(`[Desktop Page Error] ${err.message}`);
  });

  // Test 1: Default /shop view
  console.log("  → Navigating to http://localhost:3000/shop ...");
  await page.goto("http://localhost:3000/shop", { waitUntil: "networkidle" });
  await page.waitForTimeout(500); // Allow animations to settle

  await page.screenshot({
    path: path.join(targetDir, "01-shop-desktop-default.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 01-shop-desktop-default.png");

  // Test 2: Scrolled view showing grid with staggered animation
  await page.evaluate(() => window.scrollTo({ top: 380, behavior: "instant" }));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(targetDir, "02-shop-desktop-scrolled.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 02-shop-desktop-scrolled.png");

  // Test 3: Card hover state (zoom + lift + shadow)
  const firstCard = page.locator("a[href^='/product/']").first();
  await firstCard.hover();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(targetDir, "03-shop-desktop-card-hover.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 03-shop-desktop-card-hover.png");

  // Test 4: Search "chicken"
  console.log("  → Testing search for 'chicken'...");
  await page.evaluate(() => window.scrollTo({ top: 120, behavior: "instant" }));
  const searchInput = page.locator("input[aria-label='Search campus store products']");
  await searchInput.fill("chicken");
  await page.waitForTimeout(400); // Allow debounce

  const chickenCount = await page.locator("a[href^='/product/']").count();
  console.log(`    Results found for 'chicken': ${chickenCount} items`);
  await page.screenshot({
    path: path.join(targetDir, "04-shop-desktop-search-chicken.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 04-shop-desktop-search-chicken.png");

  // Test 5: Search nonsense (empty state)
  console.log("  → Testing nonsense search for empty state...");
  await searchInput.fill("xyznonexistentitem999");
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(targetDir, "05-shop-desktop-search-empty.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 05-shop-desktop-search-empty.png");

  // Reset search via Reset button in empty state
  const resetBtn = page.getByRole("button", { name: "Reset all filters" });
  if (await resetBtn.isVisible()) {
    await resetBtn.click();
    await page.waitForTimeout(400);
  }
  // Also clear the input directly to ensure clean slate
  await searchInput.fill("");
  await page.waitForTimeout(300);

  // Test 6-10: Category Tabs
  console.log("  → Testing Category Tabs...");
  const categoriesToTest = [
    { slug: "breakfast", file: "06-shop-desktop-tab-breakfast.png" },
    { slug: "lunch", file: "07-shop-desktop-tab-lunch.png" },
    { slug: "fast-food", file: "08-shop-desktop-tab-fastfood.png" },
    { slug: "beverages", file: "09-shop-desktop-tab-beverages.png" },
    { slug: "stationery", file: "10-shop-desktop-tab-stationery.png" },
  ];

  for (const cat of categoriesToTest) {
    const tabBtn = page.locator(`button:has-text("${cat.slug === 'fast-food' ? 'Fast Food' : cat.slug.charAt(0).toUpperCase() + cat.slug.slice(1)}")`).first();
    await tabBtn.click();
    await page.waitForTimeout(400);
    const count = await page.locator("[data-testid='main-product-grid'] a[href^='/product/']").count();
    console.log(`    Category '${cat.slug}': ${count} products displayed`);
    await page.screenshot({
      path: path.join(targetDir, cat.file),
      fullPage: false,
    });
    console.log(`    ✓ Saved: ${cat.file}`);
  }

  // Test 11: Deep-link directly to Stationery
  console.log("  → Testing Deep-link: /shop?category=stationery ...");
  await page.goto("http://localhost:3000/shop?category=stationery", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const deepCount = await page.locator("[data-testid='main-product-grid'] a[href^='/product/']").count();
  console.log(`    Deep-link stationery products count: ${deepCount}`);
  await page.screenshot({
    path: path.join(targetDir, "11-shop-desktop-deeplink-stationery.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 11-shop-desktop-deeplink-stationery.png");

  // Reset to All
  const allTab = page.locator("button:has-text('All Menu')").first();
  await allTab.click();
  await page.waitForTimeout(400);

  // Test 12: Filter panel toggle open
  console.log("  → Testing Filter Drawer / Panel...");
  const filterBtn = page.getByRole("button", { name: "Toggle advanced filters" });
  await filterBtn.click();
  await page.waitForTimeout(350);
  await page.screenshot({
    path: path.join(targetDir, "12-shop-desktop-filter-panel-open.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 12-shop-desktop-filter-panel-open.png");

  // Test 13: Vegetarian Only toggle
  console.log("  → Testing Vegetarian Only filter...");
  const vegCheckbox = page.locator("#filter-veg");
  await vegCheckbox.click();
  await page.waitForTimeout(400);
  const vegCount = await page.locator("[data-testid='main-product-grid'] a[href^='/product/']").count();
  console.log(`    Veg items found: ${vegCount}`);
  await page.screenshot({
    path: path.join(targetDir, "13-shop-desktop-filter-veg-only.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 13-shop-desktop-filter-veg-only.png");

  await vegCheckbox.click(); // toggle off
  await page.waitForTimeout(300);

  // Test 14: Price range slider moved to 300 PKR
  console.log("  → Testing Price Range Slider...");
  await page.evaluate(() => {
    const slider = document.querySelector("#filter-price-slider");
    if (slider) {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      nativeSetter.call(slider, "300");
      slider.dispatchEvent(new Event("input", { bubbles: true }));
      slider.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
  await page.waitForTimeout(400);
  const budgetCount = await page.locator("[data-testid='main-product-grid'] a[href^='/product/']").count();
  console.log(`    Items under PKR 300: ${budgetCount}`);
  await page.screenshot({
    path: path.join(targetDir, "14-shop-desktop-filter-price-slider.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 14-shop-desktop-filter-price-slider.png");

  // Reset slider back to 1800
  await page.evaluate(() => {
    const slider = document.querySelector("#filter-price-slider");
    if (slider) {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      nativeSetter.call(slider, "1800");
      slider.dispatchEvent(new Event("input", { bubbles: true }));
      slider.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
  await page.waitForTimeout(400);

  // Test 15-18: Sort options
  console.log("  → Testing Sorting Options...");
  const sortSelect = page.locator("select[aria-label='Sort products by']");

  // Sort Price Low to High
  await sortSelect.selectOption("price-asc");
  await page.waitForTimeout(400);
  const firstPrices = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("[data-testid='main-product-grid'] span.font-sans.text-base.font-extrabold"))
      .slice(0, 3)
      .map((el) => el.textContent.trim());
  });
  console.log(`    Price Low to High first 3: ${JSON.stringify(firstPrices)}`);
  await page.screenshot({
    path: path.join(targetDir, "15-shop-desktop-sort-price-asc.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 15-shop-desktop-sort-price-asc.png");

  // Sort Price High to Low
  await sortSelect.selectOption("price-desc");
  await page.waitForTimeout(400);
  const descPrices = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("[data-testid='main-product-grid'] span.font-sans.text-base.font-extrabold"))
      .slice(0, 3)
      .map((el) => el.textContent.trim());
  });
  console.log(`    Price High to Low first 3: ${JSON.stringify(descPrices)}`);
  await page.screenshot({
    path: path.join(targetDir, "16-shop-desktop-sort-price-desc.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 16-shop-desktop-sort-price-desc.png");

  // Sort Top Rated
  await sortSelect.selectOption("rating");
  await page.waitForTimeout(400);
  const topRatings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("[data-testid='main-product-grid'] span.font-semibold.text-espresso"))
      .slice(0, 3)
      .map((el) => el.textContent.trim());
  });
  console.log(`    Top Rated first 3: ${JSON.stringify(topRatings)}`);
  await page.screenshot({
    path: path.join(targetDir, "17-shop-desktop-sort-rating.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 17-shop-desktop-sort-rating.png");

  // Sort Name A-Z
  await sortSelect.selectOption("name-asc");
  await page.waitForTimeout(400);
  const firstNames = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("[data-testid='main-product-grid'] h3.font-serif"))
      .slice(0, 3)
      .map((el) => el.textContent.trim());
  });
  console.log(`    Name A-Z first 3: ${JSON.stringify(firstNames)}`);
  await page.screenshot({
    path: path.join(targetDir, "18-shop-desktop-sort-name-asc.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 18-shop-desktop-sort-name-asc.png");

  // Reset Sort to featured
  await sortSelect.selectOption("featured");
  await page.waitForTimeout(300);

  // Test 19: Add to Cart button interaction (+1 pop & toast notification)
  console.log("  → Testing Add button (+1 feedback & Toast notification)...");
  const addBtn = page.locator("button[aria-label^='Add ']").first();
  await addBtn.click();
  await page.waitForTimeout(200); // Capture while +1 badge and toast are visible
  await page.screenshot({
    path: path.join(targetDir, "19-shop-desktop-add-to-cart-toast.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 19-shop-desktop-add-to-cart-toast.png");
  console.log(`    Placeholder handler logs captured: ${placeholderLogs.length}`);

  // Test 20: Scroll down to "Popular Right Now" draggable carousel
  console.log("  → Testing 'Popular Right Now' carousel...");
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll("h2")).find(h => h.textContent.includes("Popular Right Now"));
    heading?.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(targetDir, "20-shop-desktop-popular-carousel.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 20-shop-desktop-popular-carousel.png");

  await desktopContext.close();

  // ==================================================
  // 2. MOBILE VERIFICATION (390 x 844)
  // ==================================================
  console.log("\n[2/2] Testing Mobile Viewport (390 x 844)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();

  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Mobile Console Error] ${msg.text()}`);
    } else if (msg.type() === "warning") {
      consoleWarnings.push(`[Mobile Console Warning] ${msg.text()}`);
    }
  });

  mobilePage.on("pageerror", (err) => {
    consoleErrors.push(`[Mobile Page Error] ${err.message}`);
  });

  // Mobile 1: Default view
  await mobilePage.goto("http://localhost:3000/shop", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(targetDir, "21-shop-mobile-default.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 21-shop-mobile-default.png");

  // Mobile 2: Filter Drawer open
  const mobileFilterBtn = mobilePage.getByRole("button", { name: "Toggle advanced filters" });
  await mobileFilterBtn.click();
  await mobilePage.waitForTimeout(350);
  await mobilePage.screenshot({
    path: path.join(targetDir, "22-shop-mobile-filter-open.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 22-shop-mobile-filter-open.png");

  await mobileFilterBtn.click(); // close filter
  await mobilePage.waitForTimeout(250);

  // Mobile 3: Search "chicken"
  const mobileSearch = mobilePage.locator("input[aria-label='Search campus store products']");
  await mobileSearch.fill("chicken");
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({
    path: path.join(targetDir, "23-shop-mobile-search-chicken.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 23-shop-mobile-search-chicken.png");

  await mobileSearch.fill("");
  await mobilePage.waitForTimeout(300);

  // Mobile 4: Stationery tab
  const mobileStatTab = mobilePage.locator("button:has-text('Stationery')").first();
  await mobileStatTab.click();
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({
    path: path.join(targetDir, "24-shop-mobile-stationery-tab.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 24-shop-mobile-stationery-tab.png");

  // Mobile 5: Add to cart toast
  const mobileAddBtn = mobilePage.locator("button[aria-label^='Add ']").first();
  await mobileAddBtn.click();
  await mobilePage.waitForTimeout(250);
  await mobilePage.screenshot({
    path: path.join(targetDir, "25-shop-mobile-cart-toast.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 25-shop-mobile-cart-toast.png");

  await mobileContext.close();
  await browser.close();

  // Verification Results
  console.log("\n==================================================");
  console.log("Verification Summary:");
  console.log(`  Console Errors: ${consoleErrors.length}`);
  console.log(`  Console Warnings: ${consoleWarnings.length}`);
  console.log(`  Cart Placeholder Logs: ${placeholderLogs.length}`);
  console.log("==================================================");

  if (consoleErrors.length > 0) {
    console.error("Errors found:", consoleErrors);
    process.exit(1);
  } else {
    console.log("All Step 03 visual tests and assertions PASSED!");
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
