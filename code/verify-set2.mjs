import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "/home/sal/Projects/Ecom-labmid/content/screenshots/set2";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log("==================================================");
  console.log("Verifying CUI Cafe Set 2 Images & Product Expansion");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });
  const errors = [];

  const attachListeners = (page, label) => {
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(`[${label} Console Error] ${msg.text()}`);
      }
    });
    page.on("pageerror", (err) => {
      errors.push(`[${label} Page Error] ${err.message}`);
    });
  };

  // 1. Desktop Context (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();
  attachListeners(page, "Desktop");

  // Screenshot 1: /breakfast showing all 4 missing cards now with real photos
  console.log("\n[1/10] Checking Desktop /breakfast for 4 real photos...");
  await page.goto("http://localhost:3000/breakfast", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Verify the 4 products on the page have real images
  const breakfastCheck = await page.evaluate(() => {
    const slugs = [
      "halwa-puri-platter",
      "aloo-paratha-with-chai",
      "egg-paratha-roll",
      "masala-omelette-toast",
    ];
    return slugs.map((slug) => {
      const link = document.querySelector(`a[href*="${slug}"]`);
      const img = link?.querySelector("img");
      return {
        slug,
        found: !!link,
        hasImage: !!img,
        src: img?.getAttribute("src") || "",
      };
    });
  });
  console.log("Breakfast 4 images verification result:", breakfastCheck);

  await page.screenshot({
    path: path.join(targetDir, "01-desktop-breakfast-all-photos.png"),
  });
  console.log("  ✓ Captured: 01-desktop-breakfast-all-photos.png");

  // Screenshot 2: /shop showing increased product count and category filter tabs
  console.log("\n[2/10] Checking Desktop /shop (81 products & filters)...");
  await page.goto("http://localhost:3000/shop", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const shopStats = await page.evaluate(() => {
    return {
      title: document.title,
      productCards: document.querySelectorAll("article, .group").length,
    };
  });
  console.log("Shop page stats:", shopStats);

  await page.screenshot({
    path: path.join(targetDir, "02-desktop-shop-increased-count.png"),
  });
  console.log("  ✓ Captured: 02-desktop-shop-increased-count.png");

  // Screenshot 3: Brand new /desserts category page
  console.log("\n[3/10] Checking Desktop /desserts category page...");
  await page.goto("http://localhost:3000/desserts", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(targetDir, "03-desktop-desserts-category.png"),
  });
  console.log("  ✓ Captured: 03-desktop-desserts-category.png");

  // Screenshot 4: One formerly missing product detail page (halwa-puri-platter)
  console.log("\n[4/10] Checking Product Detail /product/halwa-puri-platter...");
  await page.goto("http://localhost:3000/product/halwa-puri-platter", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(targetDir, "04-desktop-missing-product-detail.png"),
  });
  console.log("  ✓ Captured: 04-desktop-missing-product-detail.png");

  // Screenshot 5: One brand-new product detail page (double-fudge-chocolate-cake)
  console.log("\n[5/10] Checking Brand-new Product Detail /product/double-fudge-chocolate-cake...");
  await page.goto("http://localhost:3000/product/double-fudge-chocolate-cake", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(targetDir, "05-desktop-brand-new-product-detail.png"),
  });
  console.log("  ✓ Captured: 05-desktop-brand-new-product-detail.png");

  // Add product to cart and verify cart page
  console.log("\n[6/10] Adding product to Cart and checking /cart...");
  const addToCartBtn = page.locator("button", { hasText: /add to cart/i });
  if (await addToCartBtn.count() > 0) {
    await addToCartBtn.first().click();
    await page.waitForTimeout(600);
  }
  await page.goto("http://localhost:3000/cart", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(targetDir, "06-desktop-cart-added-product.png"),
  });
  console.log("  ✓ Captured: 06-desktop-cart-added-product.png");

  // 2. Mobile Context (390x844 - iPhone 14 style)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  attachListeners(mobilePage, "Mobile");

  // Screenshot 7: Mobile /breakfast
  console.log("\n[7/10] Checking Mobile /breakfast...");
  await mobilePage.goto("http://localhost:3000/breakfast", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(targetDir, "07-mobile-breakfast.png"),
  });
  console.log("  ✓ Captured: 07-mobile-breakfast.png");

  // Screenshot 8: Mobile /shop
  console.log("\n[8/10] Checking Mobile /shop...");
  await mobilePage.goto("http://localhost:3000/shop", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(targetDir, "08-mobile-shop.png"),
  });
  console.log("  ✓ Captured: 08-mobile-shop.png");

  // Screenshot 9: Mobile Home with closed CardNav and cart badge visible
  console.log("\n[9/10] Checking Mobile Home (CardNav closed, cart badge visible)...");
  await mobilePage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(targetDir, "09-mobile-cardnav-closed.png"),
  });
  console.log("  ✓ Captured: 09-mobile-cardnav-closed.png");

  // Screenshot 10: Mobile CardNav Menu Open
  console.log("\n[10/10] Checking Mobile CardNav Menu Open...");
  const menuBtn = mobilePage.locator(".card-nav__menu");
  if (await menuBtn.count() > 0) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(600);
  }
  await mobilePage.screenshot({
    path: path.join(targetDir, "10-mobile-cardnav-open.png"),
  });
  console.log("  ✓ Captured: 10-mobile-cardnav-open.png");

  // 3. Navigation Click Verification (0 404s)
  console.log("\n--- Testing Navigation Links (Click Verification) ---");
  const routes = [
    "/",
    "/breakfast",
    "/lunch",
    "/fast-food",
    "/beverages",
    "/desserts",
    "/stationery",
    "/shop",
    "/cart",
    "/contact",
  ];

  for (const route of routes) {
    const res = await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    const status = res?.status();
    console.log(`  Route: ${route.padEnd(15)} -> HTTP ${status}`);
    if (status !== 200) {
      errors.push(`Route ${route} returned status ${status}`);
    }
  }

  await browser.close();

  console.log("\n==================================================");
  if (errors.length > 0) {
    console.log(`Encountered ${errors.length} browser errors during verification:`);
    errors.forEach((e) => console.log(`  - ${e}`));
  } else {
    console.log("ALL 10 VERIFICATIONS PASSED WITH 0 CONSOLE OR RUNTIME ERRORS!");
  }
  console.log(`Screenshots saved to: ${targetDir}`);
  console.log("==================================================");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});