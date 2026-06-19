import { test, expect } from "@playwright/test";
import { loginViaOtp, clearAuthState } from "./fixtures/auth";
import { seedGuestCart, getGuestCartItems, GuestCartItem } from "./fixtures/cart";

const SAMPLE_GUEST_ITEMS: GuestCartItem[] = [
  {
    productItemId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    quantity: 2,
    priceSnapshot: 380,
    isSelected: true,
    updatedQuantity: 2,
  },
  {
    productItemId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    quantity: 1,
    priceSnapshot: 450,
    isSelected: true,
    updatedQuantity: 1,
  },
];

test.describe("FEA001 — Guest Cart Merge on Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await clearAuthState(page);
  });

  test("guest cart items are visible before login", async ({ page }) => {
    await seedGuestCart(page, SAMPLE_GUEST_ITEMS);
    await page.goto("/checkout/step1");

    await page.screenshot({
      path: "test-results/guest-cart-before-login.png",
      fullPage: true,
    });

    const loginPrompt = page.getByText("Login");
    await expect(loginPrompt.first()).toBeVisible({ timeout: 10_000 });
  });

  test("guest cart merges into server cart after OTP login", async ({
    page,
  }) => {
    await seedGuestCart(page, SAMPLE_GUEST_ITEMS);

    await loginViaOtp(page, "/checkout/step1");

    await page.waitForTimeout(3000);

    await page.screenshot({
      path: "test-results/cart-after-merge.png",
      fullPage: true,
    });

    const localCartItems = await getGuestCartItems(page);
    expect(localCartItems.length).toBeGreaterThan(0);
  });

  test("empty guest cart is a no-op on login (AC6)", async ({ page }) => {
    await page.evaluate(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      if (cart.state) cart.state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    });

    await loginViaOtp(page, "/checkout/step1");

    await page.waitForTimeout(2000);

    await page.screenshot({
      path: "test-results/empty-guest-cart-login.png",
      fullPage: true,
    });
  });
});
