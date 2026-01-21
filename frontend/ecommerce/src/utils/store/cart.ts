"use client";

import { CouponTypeDTO } from "@/app/(customer-checkout)/checkout/[step]/(cart)/CouponBox";
import { CartItemDbDTO, CartItemDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GIFT_WRAP_CHARGE } from "../constants";

const coupons: CouponTypeDTO[] = [
  {
    couponCode: "PREPAID5",
    discountPercent: 5,
    description: "5%  off on all prepaid orders.",
    expiresOn: "18th January 2026 | 11:59 PM",
    minPurchaseAmount: 0,
  },
  {
    couponCode: "SAVE10",
    discountPercent: 10,
    description: "10%  off on minimum purchase of Rs. 999.",
    expiresOn: "18th January 2026 | 11:59 PM",
    minPurchaseAmount: 999,
  },
  {
    couponCode: "SAVE15",
    discountPercent: 15,
    description: "15%  off on minimum purchase of Rs. 1499.",
    expiresOn: "18th January 2026 | 11:59 PM",
    minPurchaseAmount: 1499,
  },
  {
    couponCode: "SAVE20",
    discountPercent: 20,
    description: "20%  off on minimum purchase of Rs. 1999.",
    expiresOn: "18th January 2026 | 11:59 PM",
    minPurchaseAmount: 1999,
  },
];

type CartActions = {
  setCartItems: (cartItem: CartItemDTO[]) => void;
  addToCart: (cartItem: CartItemDbDTO) => void;
  updateCart: (cartItem: CartItemDbDTO) => void;
  updateCartSelected: (cartItem: CartItemDTO) => void;
  removeFromCart: (productItemId: string) => void;
  setDonation: (amount: number) => void;
  setGiftWrap: () => void;
  setSelectedCouponCode: (selectedCouponCode: string | undefined) => void;
  getInitialCartData: () => Promise<void>;
  clearCartData: () => void;
};

type CartState = {
  cartItems: CartItemDTO[];
  donation: number;
  giftWrap: boolean;
  selectedCouponCode: string | undefined;
  allCoupons: CouponTypeDTO[];
  actions: CartActions;
};
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      allCoupons: coupons,
      donation: 0,
      giftWrap: false,
      selectedCouponCode: undefined,
      actions: {
        setCartItems(cartItems) {
          set({ cartItems });
        },
        addToCart(cartItem) {
          set((state) => {
            const newcartItems = [
              ...state.cartItems,
              { ...cartItem, updatedQuantity: cartItem.quantity },
            ];
            return {
              cartItems: newcartItems,
              selectedCouponCode: undefined,
            };
          });
        },
        updateCart(cartItem) {
          set((state) => {
            return {
              cartItems: state.cartItems.map((ci) =>
                ci.productItemId === cartItem.productItemId
                  ? {
                      ...ci,
                      quantity: cartItem.quantity,
                      updatedQuantity: cartItem.quantity,
                    }
                  : ci,
              ),
              selectedCouponCode: undefined,
            };
          });
        },
        updateCartSelected(cartItem) {
          set((state) => {
            const nonUpdatedItems = state.cartItems.filter(
              (ci) => ci.productItemId !== cartItem.productItemId,
            );
            let updatedArr;
            if (cartItem.isSelected) {
              updatedArr = [cartItem, ...nonUpdatedItems];
            } else {
              updatedArr = [...nonUpdatedItems, cartItem];
            }
            return {
              cartItems: updatedArr,
              selectedCouponCode: undefined,
            };
          });
        },
        removeFromCart(productItemId) {
          set((state) => ({
            cartItems: state.cartItems.filter(
              (ci) => ci.productItemId !== productItemId,
            ),
            selectedCouponCode: undefined,
          }));
        },
        async getInitialCartData() {
          const cartItemsFromDb = await apiFetch<CartItemDbDTO[]>(
            "/cart-service/cart-items",
          );
          set({
            cartItems: cartItemsFromDb.map((c) => ({
              ...c,
              updatedQuantity: c.quantity,
            })),
          });
        },
        clearCartData() {
          set({
            cartItems: [],
            selectedCouponCode: undefined,
          });
        },
        setDonation(amount) {
          set({ donation: amount });
        },
        setGiftWrap() {
          set((state) => ({ giftWrap: !state.giftWrap }));
        },
        setSelectedCouponCode(selectedCouponCode) {
          set({ selectedCouponCode });
        },
      },
    }),
    {
      name: "cart",
      partialize: (state) => ({
        cartItems: state.cartItems,
        donation: state.donation,
        selectedCouponCode: state.selectedCouponCode,
        giftWrap: state.giftWrap,
      }),
    },
  ),
);

export const useCartActions = () => useCartStore((state) => state.actions);
export const useDonation = () => useCartStore((state) => state.donation);
export const useGiftWrap = () =>
  useCartStore((state) => (state.giftWrap ? GIFT_WRAP_CHARGE : 0));
export const useCartItems = () => useCartStore((state) => state.cartItems);
export const useCartItemById = (id: string) =>
  useCartStore((state) => state.cartItems.find((c) => c.productItemId === id));
export const useSelectedCouponCode = () =>
  useCartStore((state) => state.selectedCouponCode);
export const useCouponDetailsByCouponCode = (couponCode: string) =>
  useCartStore((state) =>
    state.allCoupons.find((c) => c.couponCode === couponCode),
  );
export const useSelectedCouponDetails = () =>
  useCartStore((state) =>
    state.allCoupons.find((c) => c.couponCode === state.selectedCouponCode),
  );
export const useAllCoupons = () => useCartStore((state) => state.allCoupons);
