import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "/home/sal/Projects/Ecom-labmid/content/screenshots/final";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log("==================================================");
  console.log("Starting CUI Cafe FINAL Verification & Screenshot Capture");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });
  const consoleErrors = [];
  const consoleWarnings = [];

  // ==================================================
  // 1. DESKTOP VIEWPORT (1440 x 900)
  // ==================================================
  console.log("\n[1/2] Capturing Desktop Viewport (1440 x 900)...");
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
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(`[Desktop Page Error] ${err.message}`);
  });

  // 1. Home - Hero top
  console.log("  → Loading Home Page...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(targetDir, "01-home-desktop-hero-top.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 01-home-desktop-hero-top.png");

  // 2. Home - Hero in portal (mid scroll)
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.2, behavior: "instant" }));
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(targetDir, "02-home-desktop-hero-zoomed.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 02-home-desktop-hero-zoomed.png");

  // 3. Home - Hero revealed (3 cols + bestsellers grid)
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.3, behavior: "instant" }));
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(targetDir, "03-home-desktop-hero-revealed.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 03-home-desktop-hero-revealed.png");

  // 4. Home - Categories section
  await page.evaluate(() => {
    // Find Browse by Category
    const headers = Array.from(document.querySelectorAll("h2"));
    const catHeader = headers.find(h => h.textContent.includes("Browse by Category"));
    if (catHeader) catHeader.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "04-home-desktop-categories.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 04-home-desktop-categories.png");

  // 5. Home - Bestsellers section
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll("h2"));
    const bestHeader = headers.find(h => h.textContent.includes("Student Campus Favorites"));
    if (bestHeader) bestHeader.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "05-home-desktop-bestsellers.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 05-home-desktop-bestsellers.png");

  // 6. Home - How to Order section
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll("h2"));
    const orderHeader = headers.find(h => h.textContent.includes("How It Works"));
    if (orderHeader) orderHeader.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "06-home-desktop-how-to-order.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 06-home-desktop-how-to-order.png");

  // 7. Home - Visit Us section
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll("h2"));
    const visitHeader = headers.find(h => h.textContent.includes("Visit CUI Cafe"));
    if (visitHeader) visitHeader.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "07-home-desktop-visit-us.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 07-home-desktop-visit-us.png");

  // 8. Shop - Default view
  console.log("  → Loading Shop Page...");
  await page.goto("http://localhost:3000/shop", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "08-shop-desktop-default.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 08-shop-desktop-default.png");

  // 9. Shop - Typed search query "burger"
  const searchInput = await page.$("input[placeholder*='Search']");
  if (searchInput) {
    await searchInput.fill("burger");
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(targetDir, "09-shop-desktop-search.png"),
      fullPage: false,
    });
    console.log("    ✓ Saved: 09-shop-desktop-search.png");
    await searchInput.fill("");
    await page.waitForTimeout(400);
  }

  // 10. Shop - Fast Food category filter
  const fastFoodTab = await page.$("button:has-text('Fast Food')");
  if (fastFoodTab) {
    await fastFoodTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(targetDir, "10-shop-desktop-filter-fastfood.png"),
      fullPage: false,
    });
    console.log("    ✓ Saved: 10-shop-desktop-filter-fastfood.png");
  }

  // 11. Shop - Sort applied
  const sortSelect = await page.$("select");
  if (sortSelect) {
    await sortSelect.selectOption("price-desc");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(targetDir, "11-shop-desktop-sort.png"),
      fullPage: false,
    });
    console.log("    ✓ Saved: 11-shop-desktop-sort.png");
  }

  // 12. Product Detail - Food item (Zinger Burger)
  console.log("  → Loading Product Detail: zinger-burger...");
  await page.goto("http://localhost:3000/product/zinger-burger", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "12-product-desktop-zinger-burger.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 12-product-desktop-zinger-burger.png");

  // 13. Product Detail - Beverage item (Cappuccino)
  console.log("  → Loading Product Detail: cappuccino...");
  await page.goto("http://localhost:3000/product/cappuccino", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "13-product-desktop-cappuccino.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 13-product-desktop-cappuccino.png");

  // 14. Product Detail - Stationery item (Lecture Register)
  console.log("  → Loading Product Detail: lecture-register-a4...");
  await page.goto("http://localhost:3000/product/lecture-register-a4", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "14-product-desktop-stationery.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 14-product-desktop-stationery.png");

  // 15. Product Detail - Gallery thumbnails (Fajita Pizza Slice)
  console.log("  → Loading Product Detail: fajita-pizza-slice with gallery thumbnails...");
  await page.goto("http://localhost:3000/product/fajita-pizza-slice", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  // Click second thumbnail
  const secondThumb = await page.$("button[type='button'] img[alt*='thumbnail 2']");
  if (secondThumb) {
    await secondThumb.click();
    await page.waitForTimeout(300);
  }
  await page.screenshot({
    path: path.join(targetDir, "15-product-desktop-gallery.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 15-product-desktop-gallery.png");

  // 16. Product Detail - Friendly 404 Page
  console.log("  → Loading invalid product slug for 404 verification...");
  await page.goto("http://localhost:3000/product/does-not-exist", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "16-product-desktop-404.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 16-product-desktop-404.png");

  // 17. Cart - Empty state
  console.log("  → Loading Cart (Empty)...");
  await page.goto("http://localhost:3000/cart", { waitUntil: "networkidle" });
  // Ensure storage is clear
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "17-cart-desktop-empty.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 17-cart-desktop-empty.png");

  // 18. Cart - Add 3 items and view Cart with items
  console.log("  → Adding items to Cart from shop...");
  await page.goto("http://localhost:3000/product/zinger-burger", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const addBtn1 = await page.$("button:has-text('Add 1 to Cart')");
  if (addBtn1) await addBtn1.click();
  await page.waitForTimeout(500);

  await page.goto("http://localhost:3000/product/cappuccino", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const addBtn2 = await page.$("button:has-text('Add 1 to Cart')");
  if (addBtn2) await addBtn2.click();
  await page.waitForTimeout(500);

  await page.goto("http://localhost:3000/product/fajita-pizza-slice", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const addBtn3 = await page.$("button:has-text('Add 1 to Cart')");
  if (addBtn3) await addBtn3.click();
  await page.waitForTimeout(600);

  console.log("  → Viewing Cart with 3 items...");
  await page.goto("http://localhost:3000/cart", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(targetDir, "18-cart-desktop-with-items.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 18-cart-desktop-with-items.png");

  // 19. Cart - Proceed to Checkout & Fill Form
  console.log("  → Opening Checkout form...");
  const checkoutBtn = await page.$("button:has-text('Proceed to Checkout')");
  if (checkoutBtn) {
    await checkoutBtn.click();
    await page.waitForTimeout(400);

    // Fill form
    await page.fill("input[placeholder*='Usama Khan']", "Ali Ahmed");
    await page.fill("input[placeholder*='SP23-BCS-042']", "FA23-BCS-088");
    await page.fill("input[placeholder*='0300 1234567']", "0312 9876543");
    await page.fill("input[placeholder*='Extra chutney']", "Deliver outside CS Lab 3 during 11:30 AM break");
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(targetDir, "19-cart-desktop-checkout-form.png"),
      fullPage: false,
    });
    console.log("    ✓ Saved: 19-cart-desktop-checkout-form.png");

    // 20. Place Order & Order Success Screen
    console.log("  → Placing Order...");
    const placeOrderBtn = await page.$("button[type='submit']:has-text('Place Order')");
    if (placeOrderBtn) {
      await placeOrderBtn.click();
      await page.waitForTimeout(700);
      await page.screenshot({
        path: path.join(targetDir, "20-cart-desktop-order-success.png"),
        fullPage: false,
      });
      console.log("    ✓ Saved: 20-cart-desktop-order-success.png");
    }
  }

  // 21. Category: Breakfast
  console.log("  → Loading Category: Breakfast...");
  await page.goto("http://localhost:3000/breakfast", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "21-category-desktop-breakfast.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 21-category-desktop-breakfast.png");

  // 22. Category: Lunch
  console.log("  → Loading Category: Lunch...");
  await page.goto("http://localhost:3000/lunch", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "22-category-desktop-lunch.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 22-category-desktop-lunch.png");

  // 23. Category: Fast Food
  console.log("  → Loading Category: Fast Food...");
  await page.goto("http://localhost:3000/fast-food", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "23-category-desktop-fast-food.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 23-category-desktop-fast-food.png");

  // 24. Category: Beverages
  console.log("  → Loading Category: Beverages...");
  await page.goto("http://localhost:3000/beverages", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "24-category-desktop-beverages.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 24-category-desktop-beverages.png");

  // 25. Category: Stationery
  console.log("  → Loading Category: Stationery...");
  await page.goto("http://localhost:3000/stationery", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "25-category-desktop-stationery.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 25-category-desktop-stationery.png");

  // 26. Contact Page - Form + Info
  console.log("  → Loading Contact Page...");
  await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(targetDir, "26-contact-desktop.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 26-contact-desktop.png");

  // 27. Contact Page - Form submitted
  const contactNameInput = await page.$("input#contact-name");
  if (contactNameInput) {
    await contactNameInput.fill("Hamza Tariq");
    await page.fill("input#contact-email", "hamza.tariq@comsats.edu.pk");
    await page.fill("textarea#contact-message", "We would like to inquire about reserving Counter #1 for CS Society Orientation snacks on Friday.");
    const submitBtn = await page.$("button[type='submit']:has-text('Submit Message')");
    if (submitBtn) {
      await submitBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(targetDir, "27-contact-desktop-submitted.png"),
        fullPage: false,
      });
      console.log("    ✓ Saved: 27-contact-desktop-submitted.png");
    }
  }

  // ==================================================
  // 2. MOBILE VIEWPORT (390 x 844)
  // ==================================================
  console.log("\n[2/2] Capturing Mobile Viewport (390 x 844)...");
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

  // 28. Mobile Home Hero
  console.log("  → Loading Mobile Home...");
  await mobilePage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: path.join(targetDir, "28-mobile-home-hero.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 28-mobile-home-hero.png");

  // 29. Mobile Menu Open
  console.log("  → Opening Mobile Navigation Drawer...");
  const menuBtn = await mobilePage.$("button[data-testid='mobile-menu-toggle']");
  if (menuBtn) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({
      path: path.join(targetDir, "29-mobile-menu-open.png"),
      fullPage: false,
    });
    console.log("    ✓ Saved: 29-mobile-menu-open.png");
    await menuBtn.click(); // Close
    await mobilePage.waitForTimeout(300);
  }

  // 30. Mobile Home Categories
  await mobilePage.evaluate(() => {
    const headers = Array.from(document.querySelectorAll("h2"));
    const catHeader = headers.find(h => h.textContent.includes("Browse by Category"));
    if (catHeader) catHeader.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(targetDir, "30-mobile-home-categories.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 30-mobile-home-categories.png");

  // 31. Mobile Shop
  console.log("  → Loading Mobile Shop...");
  await mobilePage.goto("http://localhost:3000/shop", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(targetDir, "31-mobile-shop.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 31-mobile-shop.png");

  // 32. Mobile Product Detail
  console.log("  → Loading Mobile Product Detail: zinger-burger...");
  await mobilePage.goto("http://localhost:3000/product/zinger-burger", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(targetDir, "32-mobile-product-detail.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 32-mobile-product-detail.png");

  // 33. Mobile Cart with items
  console.log("  → Adding item on mobile and viewing Cart...");
  const mobAddBtn = await mobilePage.$("button:has-text('Add 1 to Cart')");
  if (mobAddBtn) await mobAddBtn.click();
  await mobilePage.waitForTimeout(500);
  await mobilePage.goto("http://localhost:3000/cart", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(targetDir, "33-mobile-cart-with-items.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 33-mobile-cart-with-items.png");

  // 34. Mobile Contact
  console.log("  → Loading Mobile Contact...");
  await mobilePage.goto("http://localhost:3000/contact", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(targetDir, "34-mobile-contact.png"),
    fullPage: false,
  });
  console.log("    ✓ Saved: 34-mobile-contact.png");

  await browser.close();

  console.log("\n==================================================");
  console.log(`Verification Complete. Captured 34 screenshots.`);
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error(consoleErrors);
    process.exit(1);
  }
  console.log("==================================================");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
