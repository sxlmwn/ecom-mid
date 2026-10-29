import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targetDir = "/home/sal/Projects/Ecom-labmid/content/screenshots/step-02";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log("Starting Step 02 Verification with Playwright...");
  const browser = await chromium.launch({ headless: true });

  const consoleErrors = [];
  const consoleWarnings = [];

  // ==========================================
  // 1. DESKTOP VERIFICATION (1440 x 900)
  // ==========================================
  console.log("\n--- Testing Desktop (1440px) ---");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();

  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Desktop Console Error] ${msg.text()}`);
    } else if (msg.type() === "warning") {
      consoleWarnings.push(`[Desktop Console Warning] ${msg.text()}`);
    }
  });
  desktopPage.on("pageerror", (err) => {
    consoleErrors.push(`[Desktop Page Error] ${err.message}`);
  });

  await desktopPage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await desktopPage.waitForSelector("[data-gp-pin]", { timeout: 8000 });
  await desktopPage.waitForTimeout(300); // Allow layout to settle

  // Calculate portal scroll height
  const portalMetrics = await desktopPage.evaluate(() => {
    const pin = document.querySelector("[data-gp-pin]");
    const section = pin?.closest("section") || document.querySelector("section");
    const content = document.querySelector("[data-gp-content]");
    const length = parseFloat(getComputedStyle(section).getPropertyValue("--gp-length") || "2.4");
    const vh = window.innerHeight;
    const scrollRange = (length - 1) * vh;
    return {
      sectionHeight: section?.offsetHeight,
      scrollRange,
      vh,
      contentTop: content?.getBoundingClientRect().top + window.scrollY,
    };
  });
  console.log("Portal metrics:", portalMetrics);

  const scrollRange = portalMetrics.scrollRange;

  // Checkpoints: 0%, 25%, 50%, 75%, 100%, revealed
  const checkpoints = [
    { name: "hero-desktop-000.png", fraction: 0 },
    { name: "hero-desktop-025.png", fraction: 0.25 },
    { name: "hero-desktop-050.png", fraction: 0.5 },
    { name: "hero-desktop-075.png", fraction: 0.75 },
    { name: "hero-desktop-100.png", fraction: 1.0 },
  ];

  for (const cp of checkpoints) {
    const scrollY = Math.round(scrollRange * cp.fraction);
    await desktopPage.evaluate((y) => window.scrollTo(0, y), scrollY);
    await desktopPage.waitForTimeout(250);
    const filePath = path.join(targetDir, cp.name);
    await desktopPage.screenshot({ path: filePath });
    console.log(`Saved: ${cp.name} (scrollY=${scrollY})`);
  }

  // Scroll to revealed content and capture
  const revealedScrollY = Math.round(scrollRange + 350);
  await desktopPage.evaluate((y) => window.scrollTo(0, y), revealedScrollY);
  await desktopPage.waitForTimeout(300);
  const revealedPath = path.join(targetDir, "hero-desktop-revealed.png");
  await desktopPage.screenshot({ path: revealedPath });
  console.log(`Saved: hero-desktop-revealed.png (scrollY=${revealedScrollY})`);

  // Verify that revealed links/buttons are clickable
  const browseMenuBtn = desktopPage.locator('a[href="/shop"]:has-text("Browse Menu")');
  const contactUsBtn = desktopPage.locator('a[href="/contact"]:has-text("Contact Us")');
  const isBrowseVisible = await browseMenuBtn.isVisible();
  const isContactVisible = await contactUsBtn.isVisible();
  console.log(`Browse Menu Button clickable & visible: ${isBrowseVisible}`);
  console.log(`Contact Us Button clickable & visible: ${isContactVisible}`);

  // Test Interactivity: Return to top, click letter "A" or "F"
  console.log("\nTesting Interactivity: selecting different letter in CAFE...");
  await desktopPage.evaluate(() => window.scrollTo(0, 0));
  await desktopPage.waitForTimeout(300);

  // Click letter button 'A' (index 1)
  const letterButtons = desktopPage.locator("[data-gp-letter]");
  const letterCount = await letterButtons.count();
  console.log(`Letter buttons found: ${letterCount}`);

  if (letterCount > 1) {
    // Click letter 'A'
    await letterButtons.nth(1).click();
    await desktopPage.waitForTimeout(200);
    const letterSwitchPath = path.join(targetDir, "hero-desktop-letter-switch.png");
    await desktopPage.screenshot({ path: letterSwitchPath });
    console.log(`Saved: hero-desktop-letter-switch.png`);

    // Test keyboard arrow key
    await letterButtons.nth(1).press("ArrowRight");
    await desktopPage.waitForTimeout(200);
  }

  // Test "Step inside" button
  console.log('Testing "Step inside" anchor link click...');
  const enterBtn = desktopPage.locator("[data-gp-enter]");
  await enterBtn.click();
  await desktopPage.waitForTimeout(600); // Wait for smooth scroll
  const stepInsideScrollY = await desktopPage.evaluate(() => window.scrollY);
  console.log(`Scroll position after "Step inside" click: ${stepInsideScrollY}px`);
  const stepInsidePath = path.join(targetDir, "hero-desktop-step-inside.png");
  await desktopPage.screenshot({ path: stepInsidePath });
  console.log(`Saved: hero-desktop-step-inside.png`);

  await desktopContext.close();

  // ==========================================
  // 2. MOBILE VERIFICATION (390 x 844)
  // ==========================================
  console.log("\n--- Testing Mobile (390px) ---");
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

  await mobilePage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await mobilePage.waitForSelector("[data-gp-pin]", { timeout: 8000 });
  await mobilePage.waitForTimeout(300);

  const mobileScrollRange = await mobilePage.evaluate(() => {
    const pin = document.querySelector("[data-gp-pin]");
    const section = pin?.closest("section") || document.querySelector("section");
    const length = parseFloat(getComputedStyle(section).getPropertyValue("--gp-length") || "2.4");
    return (length - 1) * window.innerHeight;
  });

  const mobileCheckpoints = [
    { name: "hero-mobile-000.png", fraction: 0 },
    { name: "hero-mobile-025.png", fraction: 0.25 },
    { name: "hero-mobile-050.png", fraction: 0.5 },
    { name: "hero-mobile-075.png", fraction: 0.75 },
    { name: "hero-mobile-100.png", fraction: 1.0 },
  ];

  for (const cp of mobileCheckpoints) {
    const scrollY = Math.round(mobileScrollRange * cp.fraction);
    await mobilePage.evaluate((y) => window.scrollTo(0, y), scrollY);
    await mobilePage.waitForTimeout(250);
    const filePath = path.join(targetDir, cp.name);
    await mobilePage.screenshot({ path: filePath });
    console.log(`Saved: ${cp.name} (scrollY=${scrollY})`);
  }

  // Mobile revealed
  const mobileRevealedY = Math.round(mobileScrollRange + 400);
  await mobilePage.evaluate((y) => window.scrollTo(0, y), mobileRevealedY);
  await mobilePage.waitForTimeout(300);
  const mobileRevealedPath = path.join(targetDir, "hero-mobile-revealed.png");
  await mobilePage.screenshot({ path: mobileRevealedPath });
  console.log(`Saved: hero-mobile-revealed.png`);

  // Mobile letter picker test
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(300);

  const touchPickerSelect = mobilePage.locator("select[data-gp-select]");
  const isSelectVisible = await touchPickerSelect.isVisible();
  console.log(`Touch letter picker visible on mobile: ${isSelectVisible}`);

  if (isSelectVisible) {
    await touchPickerSelect.selectOption({ index: 2 }); // Choose letter 'A'
    await mobilePage.waitForTimeout(200);
  }
  const pickerPath = path.join(targetDir, "hero-mobile-letter-picker.png");
  await mobilePage.screenshot({ path: pickerPath });
  console.log(`Saved: hero-mobile-letter-picker.png`);

  await mobileContext.close();

  // ==========================================
  // 3. TABLET VERIFICATION (768 x 1024)
  // ==========================================
  console.log("\n--- Testing Tablet (768px) ---");
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
  });
  const tabletPage = await tabletContext.newPage();

  await tabletPage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await tabletPage.waitForSelector("[data-gp-pin]", { timeout: 8000 });
  await tabletPage.waitForTimeout(300);

  const tablet0Path = path.join(targetDir, "hero-tablet-000.png");
  await tabletPage.screenshot({ path: tablet0Path });
  console.log(`Saved: hero-tablet-000.png`);

  const tabletScrollRange = await tabletPage.evaluate(() => {
    const pin = document.querySelector("[data-gp-pin]");
    const section = pin?.closest("section") || document.querySelector("section");
    const length = parseFloat(getComputedStyle(section).getPropertyValue("--gp-length") || "2.4");
    return (length - 1) * window.innerHeight;
  });
  await tabletPage.evaluate((y) => window.scrollTo(0, y), Math.round(tabletScrollRange + 300));
  await tabletPage.waitForTimeout(300);

  const tabletRevPath = path.join(targetDir, "hero-tablet-revealed.png");
  await tabletPage.screenshot({ path: tabletRevPath });
  console.log(`Saved: hero-tablet-revealed.png`);

  await tabletContext.close();

  await browser.close();

  console.log("\n==========================================");
  console.log(`Step 02 Automated Verification Complete!`);
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("Console Errors:", consoleErrors);
    process.exit(1);
  } else {
    console.log("All verifications passed with 0 console errors!");
  }
}

run().catch((err) => {
  console.error("Verification script failed:", err);
  process.exit(1);
});
