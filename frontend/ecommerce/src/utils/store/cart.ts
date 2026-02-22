"use client";

import { CouponTypeDTO } from "@/app/(customer-checkout)/checkout/[step]/(cart)/CouponBox";
import {
  CartItemDbDTO,
  CartItemDTO,
  PriceSummaryRequest,
  PriceSummaryResponse,
} from "@/constants/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getAllCouponsAction,
  getTotalProductPrice,
} from "@/app/(customer-checkout)/checkout/cartActions";

type CartActions = {
  setCartItems: (cartItem: CartItemDTO[]) => void;
  addToCart: (cartItem: CartItemDbDTO) => void;
  updateCart: (cartItem: CartItemDbDTO) => void;
  updateCartSelected: (cartItem: CartItemDTO) => void;
  removeFromCart: (productItemId: string) => void;
  setDonation: (amount: number) => void;
  setGiftWrap: () => void;
  setSelectedCouponCode: (selectedCouponCode: string | undefined) => void;
  getAllCoupons: () => Promise<void>;
  clearCartData: () => void;
  setPriceSummary: (body: PriceSummaryRequest) => Promise<void>;
};

type CartState = {
  cartItems: CartItemDTO[];
  donation: number;
  giftWrap: boolean;
  selectedCouponCode: string | null;
  allCoupons: CouponTypeDTO[];
  actions: CartActions;
  priceSummary: PriceSummaryResponse;
};
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      allCoupons: [],
      donation: 0,
      giftWrap: false,
      selectedCouponCode: null,
      priceSummary: {
        itemsTotalMrp: 0,
        productDiscount: 0,
        couponDiscount: 0,
        donation: 0,
        giftWrapFee: 0,
        payableAmount: 0,
        shippingFee: 0,
        amountToAvoidShippingFee: 0,
      },
      actions: {
        setCartItems(cartItems) {
          set({ cartItems });
        },
        addToCart(cartItem) {
          set((state) => {
            const newcartItems = [
              ...state.cartItems,
              {
                ...cartItem,
                updatedQuantity: cartItem.quantity,
                isSelected: true,
              },
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
        async getAllCoupons() {
          const couponsFromDb = await getAllCouponsAction();
          set({
            allCoupons: couponsFromDb,
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
        async setPriceSummary(body: PriceSummaryRequest) {
          const priceSummary = await getTotalProductPrice(body);
          set({ priceSummary });
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
export const useGiftWrap = () => useCartStore((state) => state.giftWrap);
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
    state.selectedCouponCode === null
      ? null
      : state.allCoupons.find((c) => c.couponCode === state.selectedCouponCode),
  );
export const useAllCoupons = () => useCartStore((state) => state.allCoupons);

export const usePriceSummary = () =>
  useCartStore((state) => state.priceSummary);
