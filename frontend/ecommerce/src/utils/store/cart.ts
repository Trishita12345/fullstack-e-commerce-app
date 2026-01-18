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
  setCoupon: (code: string, amount: number, maxValue: number) => void;
  getInitialCartData: () => Promise<void>;
  clearCartData: () => void;
};

type CartState = {
  cartItems: CartItemDTO[];
  donation: number;
  coupon: { couponCode: string; couponDiscount: number; maxValue: number };
  actions: CartActions;
};
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      donation: 0,
      coupon: { couponCode: "", couponDiscount: 0, maxValue: 0 },
      actions: {
        addToCart(cartItem) {
          set((state) => {
            const newcartItems = [...state.cartItems, { ...cartItem }];
            return {
              cartItems: newcartItems,
              coupon: { couponCode: "", couponDiscount: 0, maxValue: 0 },
            };
          });
        },
        updateCart(cartItem) {
          set((state) => {
            console.log(cartItem);
            return {
              cartItems: state.cartItems.map((ci) =>
                ci.productItemId === cartItem.productItemId
                  ? {
                      ...ci,
                      isSelected: cartItem.isSelected ?? ci.isSelected,
                      quantity: cartItem.quantity,
                    }
                  : ci
              ),
              coupon: { couponCode: "", couponDiscount: 0, maxValue: 0 },
            };
          });
        },
        removeFromCart(productItemId) {
          set((state) => ({
            cartItems: state.cartItems.filter(
              (ci) => ci.productItemId !== productItemId
            ),
            coupon: { couponCode: "", couponDiscount: 0, maxValue: 0 },
          }));
        },
        async getInitialCartData() {
          const cartItemsFromDb = await apiFetch<CartItemDTO[]>(
            "/cart-service/cart-items"
          );
          set({ cartItems: cartItemsFromDb });
        },
        clearCartData() {
          set({
            cartItems: [],
            coupon: { couponCode: "", couponDiscount: 0, maxValue: 0 },
          });
        },
        setDonation(amount) {
          set({ donation: amount });
        },
        setCoupon(code, amount, maxValue) {
          if (code)
            set({
              coupon: { couponCode: code, couponDiscount: amount, maxValue },
            });
          else
            set({ coupon: { couponCode: "", couponDiscount: 0, maxValue: 0 } });
        },
      },
    }),
    {
      name: "cart",
      partialize: (state) => ({
        cartItems: state.cartItems,
        donation: state.donation,
        coupon: state.coupon,
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
