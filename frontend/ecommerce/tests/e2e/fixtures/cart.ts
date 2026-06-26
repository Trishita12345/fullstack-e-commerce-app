import { type Page, expect } from "@playwright/test";

export interface GuestCartItem {
  productItemId: string;
  quantity: number;
  priceSnapshot: number;
  isSelected: boolean;
  updatedQuantity: number;
}

export async function seedGuestCart(page: Page, items: GuestCartItem[]) {
  await page.evaluate((cartItems) => {
    const cartState = JSON.parse(localStorage.getItem("cart") || "{}");
    cartState.state = cartState.state || {};
    cartState.state.cartItems = cartItems;
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, items);
}

export async function getGuestCartItems(page: Page): Promise<GuestCartItem[]> {
  return page.evaluate(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    return cart?.state?.cartItems || [];
  });
}

export async function clearGuestCart(page: Page) {
  await page.evaluate(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (cart.state) {
      cart.state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}

export async function expectCartNotEmpty(page: Page) {
  const items = await getGuestCartItems(page);
  expect(items.length).toBeGreaterThan(0);
}

export async function expectCartItemCount(page: Page, count: number) {
  const items = await getGuestCartItems(page);
  expect(items.length).toBe(count);
}
