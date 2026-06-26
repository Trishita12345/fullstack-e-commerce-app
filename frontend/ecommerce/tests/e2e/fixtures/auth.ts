import { type Page, expect } from "@playwright/test";

const TEST_PHONE = process.env.TEST_PHONE || "9999999999";

export async function loginViaOtp(
  page: Page,
  redirectUrl = "/checkout/cart",
) {
  await page.goto("/login");
  await page.waitForLoadState("networkidle");

  const phoneInput = page.locator('input[type="tel"], input[name="phone"]');
  await phoneInput.fill(TEST_PHONE);

  const termsCheckbox = page.locator('input[type="checkbox"]');
  if (await termsCheckbox.isVisible()) {
    await termsCheckbox.check();
  }

  const continueBtn = page.getByRole("button", { name: /continue|send otp/i });
  await continueBtn.click();
  await page.waitForLoadState("networkidle");

  // OTP is displayed on screen — read it
  const otpDisplay = page.locator("[data-testid='otp-display'], .otp-value, [class*='otp']");
  let otpValue: string | null = null;

  if (await otpDisplay.isVisible({ timeout: 3000 }).catch(() => false)) {
    otpValue = await otpDisplay.textContent();
  }

  if (!otpValue) {
    // Fallback: look for OTP in any visible text on the page
    const bodyText = await page.locator("body").textContent();
    const otpMatch = bodyText?.match(/\b(\d{4,6})\b/);
    if (otpMatch) otpValue = otpMatch[1];
  }

  if (!otpValue) {
    throw new Error("Could not find OTP on screen");
  }

  // Fill OTP digits into pin inputs
  const pinInputs = page.locator("input[type='tel'][maxlength='1'], input[type='number'][maxlength='1']");
  const pinCount = await pinInputs.count();

  if (pinCount > 0) {
    for (let i = 0; i < otpValue.length && i < pinCount; i++) {
      await pinInputs.nth(i).fill(otpValue[i]);
    }
  } else {
    const singleInput = page.locator("input[name*='otp'], input[placeholder*='OTP']");
    await singleInput.fill(otpValue);
  }

  const verifyBtn = page.getByRole("button", { name: /verify|submit/i });
  await verifyBtn.click();

  // Wait for navigation away from OTP page
  await expect(page).not.toHaveURL(/\/otp/, { timeout: 15_000 });
}

export async function clearAuthState(page: Page) {
  await page.evaluate(() => localStorage.removeItem("auth"));
}
