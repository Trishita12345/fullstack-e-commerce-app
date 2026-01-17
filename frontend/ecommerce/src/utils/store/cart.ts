"use client";

import { CouponTypeDTO } from "@/app/(customer-checkout)/checkout/[step]/(cart)/CouponBox";
import { CartItemDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartActions = {
  addToCart: (cartItem: CartItemDTO) => void;
  updateCart: (cartItem: CartItemDTO) => void;
  removeFromCart: (productItemId: string) => void;
  setDonation: (amount: number) => void;
  setCoupon: (code: string, amount: number) => void;
  getInitialCartData: () => void;
  clearCartData: () => void;
};

type CartState = {
  cartItems: CartItemDTO[];
  donation: number;
  coupon: {couponCode: string, couponDiscount: number};
  actions: CartActions;
};
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      donation: 0,
      coupon: {couponCode: '', couponDiscount: 0},
      actions: {
        addToCart(cartItem) {
          set((state) => ({ cartItems: [...state.cartItems, cartItem] }));
          set({ coupon: {couponCode: '', couponDiscount: 0}})
        },
        updateCart(cartItem) {
          set((state) => ({
            cartItems: state.cartItems.map((ci) =>
              ci.productItemId === cartItem.productItemId ? cartItem : ci
            ),
          }));
          set({ coupon: { couponCode: '', couponDiscount: 0 } })
        },
        removeFromCart(productItemId) {
          set((state) => ({
            cartItems: state.cartItems.filter(
              (ci) => ci.productItemId !== productItemId
            ),
          }));
          set({ coupon: {couponCode: '', couponDiscount: 0}})
        },
        async getInitialCartData() {
          const cartItemsFromDb = await apiFetch<CartItemDTO[]>(
            "/cart-service/cart-items"
          );
          set({ cartItems: cartItemsFromDb });
        },
        clearCartData() {
          set({ cartItems: [] });
          set({ coupon: {couponCode: '', couponDiscount: 0}})
        },
        setDonation(amount) {
          set({ donation: amount });
        },
        setCoupon(code, amount) {
          if(code) set({ coupon: { couponCode: code, couponDiscount: amount } });
          else set({ coupon: {couponCode: '', couponDiscount: 0}});
        }
      },
    }),
    {
      name: "cart",
      partialize: (state) => ({
        cartItems: state.cartItems,
        donation: state.donation,
        coupon: state.coupon
      }),
    }
  )
);

export const useCartActions = () => useCartStore((state) => state.actions);
export const useDonation = () => useCartStore((state) => state.donation);
export const useCoupon = () => useCartStore((state) => state.coupon);
export const useCartItems = () => useCartStore((state) => state.cartItems);
export const useCartItemById = (id: string) =>
  useCartStore((state) => state.cartItems.find((c) => c.productItemId === id));
