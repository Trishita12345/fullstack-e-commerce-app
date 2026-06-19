import { Page } from "@playwright/test";

const DEV_PHONE = "7777777777";

export async function loginViaOtp(
  page: Page,
  redirectUrl = "/",
): Promise<void> {
  await page.goto(
    `/login?redirectUrl=${encodeURIComponent(redirectUrl)}`,
  );

  const phoneInput = page.getByPlaceholder("Enter your mobile number");
  await phoneInput.fill(DEV_PHONE);

  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.waitForURL(/\/otp\?/);

  const otpFromUrl = new URL(page.url()).searchParams.get("otp") ?? "";

  const pinInputs = page.locator("input[inputmode='tel']");
  for (let i = 0; i < otpFromUrl.length; i++) {
    await pinInputs.nth(i).fill(otpFromUrl[i]);
  }

  await page.getByRole("button", { name: "Verify OTP" }).click();

  await page.waitForURL((url) => !url.pathname.includes("/otp"), {
    timeout: 15_000,
  });
}

export async function clearAuthState(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.removeItem("auth");
  });
}
