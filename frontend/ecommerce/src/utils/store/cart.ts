"use client";

import { CartItemDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartActions = {
  addToCart: (cartItem: CartItemDTO) => void;
  updateCart: (cartItem: CartItemDTO) => void;
  removeFromCart: (productItemId: string) => void;
  getInitialCartData: () => void;
  clearCartData: () => void;
};

type CartState = {
  cartItems: CartItemDTO[];
  actions: CartActions;
};
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      actions: {
        addToCart(cartItem) {
          set((state) => ({ cartItems: [...state.cartItems, cartItem] }));
        },
        updateCart(cartItem) {
          set((state) => ({
            cartItems: state.cartItems.map((ci) =>
              ci.productItemId === cartItem.productItemId ? cartItem : ci
            ),
          }));
        },
        removeFromCart(productItemId) {
          set((state) => ({
            cartItems: state.cartItems.filter(
              (ci) => ci.productItemId !== productItemId
            ),
          }));
        },
        async getInitialCartData() {
          const cartItemsFromDb = await apiFetch<CartItemDTO[]>(
            "/cart-service/cart-items"
          );
          set({ cartItems: cartItemsFromDb });
        },
        clearCartData() {
          set({ cartItems: [] });
        },
      },
    }),
    {
      name: "cart",
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);

export const useCartActions = () => useCartStore((state) => state.actions);
export const useCartItems = () => useCartStore((state) => state.cartItems);
export const useCartItemById = (id: string) =>
  useCartStore((state) => state.cartItems.find((c) => c.productItemId === id));
