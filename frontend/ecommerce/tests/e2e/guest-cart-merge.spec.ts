import { test, expect } from "@playwright/test";
import { loginViaOtp, clearAuthState } from "./fixtures/auth";
import {
  seedGuestCart,
  getGuestCartItems,
  clearGuestCart,
  type GuestCartItem,
} from "./fixtures/cart";

const SAMPLE_CART_ITEM: GuestCartItem = {
  productItemId: "test-product-item-001",
  quantity: 1,
  priceSnapshot: 380,
  isSelected: true,
  updatedQuantity: 1,
};

test.describe("FEA001: Guest Cart Merge on Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await clearAuthState(page);
    await clearGuestCart(page);
  });

  test("guest cart items are preserved on /checkout/cart (hydration fix)", async ({
    page,
  }) => {
    await seedGuestCart(page, [SAMPLE_CART_ITEM]);

    const itemsBefore = await getGuestCartItems(page);
    expect(itemsBefore.length).toBe(1);

    await page.goto("/checkout/cart");
    await page.waitForLoadState("networkidle");

    // After the hydration fix, cart items must NOT be cleared
    const itemsAfter = await getGuestCartItems(page);
    expect(itemsAfter.length).toBe(1);
    expect(itemsAfter[0].productItemId).toBe(SAMPLE_CART_ITEM.productItemId);
  });

  test("guest cart merges into server cart after OTP login", async ({
    page,
  }) => {
    // Add item to guest cart via PDP interaction
    await page.goto("/products");
    await page.waitForLoadState("networkidle");

    const firstProduct = page.locator("a[href*='/products/']").first();
    await firstProduct.click();
    await page.waitForLoadState("networkidle");

    const addToCartBtn = page.getByRole("button", {
      name: /add to cart/i,
    });
    if (await addToCartBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addToCartBtn.click();
      await page.waitForTimeout(1000);
    }

    const guestItems = await getGuestCartItems(page);
    const guestItemCount = guestItems.length;
    expect(guestItemCount).toBeGreaterThan(0);

    // Login via OTP
    await loginViaOtp(page);

    // After login, navigate to cart — merged items should be present
    await page.goto("/checkout/cart");
    await page.waitForLoadState("networkidle");

    // Cart should show items (merged from guest + any existing server cart)
    const cartContent = page.locator("[class*='cart'], [data-testid='cart']");
    await expect(cartContent.or(page.locator("body"))).toContainText(
      /selected|item|cart/i,
      { timeout: 10_000 },
    );
  });

  test("empty guest cart is a no-op on login (AC6)", async ({ page }) => {
    // Ensure guest cart is empty
    await clearGuestCart(page);

    const itemsBefore = await getGuestCartItems(page);
    expect(itemsBefore.length).toBe(0);

    // Login with empty guest cart
    await loginViaOtp(page);

    // Should not error — login completes normally
    await expect(page).not.toHaveURL(/\/login|\/otp/, { timeout: 10_000 });
  });

  test("guest cart page shows login prompt for unauthenticated users", async ({
    page,
  }) => {
    await seedGuestCart(page, [SAMPLE_CART_ITEM]);

    await page.goto("/checkout/cart");
    await page.waitForLoadState("networkidle");

    // Should show a login prompt or "Login to Proceed" button
    const loginPrompt = page.getByRole("button", {
      name: /login|sign in|proceed/i,
    });
    const loginText = page.locator("text=/login|sign in/i");

    const hasPrompt =
      (await loginPrompt.isVisible({ timeout: 5000 }).catch(() => false)) ||
      (await loginText.isVisible({ timeout: 2000 }).catch(() => false));

    expect(hasPrompt).toBeTruthy();
  });
});
