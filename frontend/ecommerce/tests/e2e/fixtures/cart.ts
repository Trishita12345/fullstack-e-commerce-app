import { Page } from "@playwright/test";

export interface GuestCartItem {
  productItemId: string;
  quantity: number;
  priceSnapshot: number;
  isSelected: boolean;
  updatedQuantity: number;
}

export async function seedGuestCart(
  page: Page,
  items: GuestCartItem[],
): Promise<void> {
  await page.evaluate((cartItems) => {
    const existing = JSON.parse(localStorage.getItem("cart") || "{}");
    existing.state = existing.state || {};
    existing.state.cartItems = cartItems;
    localStorage.setItem("cart", JSON.stringify(existing));
  }, items);
}

export async function getGuestCartItems(
  page: Page,
): Promise<GuestCartItem[]> {
  return page.evaluate(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    return cart.state?.cartItems ?? [];
  });
}

export async function clearGuestCart(page: Page): Promise<void> {
  await page.evaluate(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (cart.state) {
      cart.state.cartItems = [];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  });
}
