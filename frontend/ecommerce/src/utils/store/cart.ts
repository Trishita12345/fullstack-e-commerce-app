"use client";

import { CouponTypeDTO } from "@/app/(customer-checkout)/checkout/[step]/(cart)/CouponBox";
import {
  CartItemDbDTO,
  CartItemDTO,
  TotalPriceFromProductDTO,
  TotalPriceFromProductDTORequest,
} from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GIFT_WRAP_CHARGE } from "../constants";

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
  getAllCoupons: () => Promise<void>;
  clearCartData: () => void;
  setTotalPrice: (body: TotalPriceFromProductDTORequest[]) => Promise<void>;
};

type CartState = {
  cartItems: CartItemDTO[];
  donation: number;
  giftWrap: boolean;
  selectedCouponCode: string | undefined;
  allCoupons: CouponTypeDTO[];
  actions: CartActions;
  totalBasePrice: number;
  totalDiscountedPrice: number;
};
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      allCoupons: [],
      donation: 0,
      giftWrap: false,
      selectedCouponCode: undefined,
      totalBasePrice: 0,
      totalDiscountedPrice: 0,
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
        async getInitialCartData() {
          const cartItemsFromDb = await apiFetch<CartItemDTO[]>(
            "/cart-service/cart-items",
          );
          set({
            cartItems: cartItemsFromDb,
          });
        },
        async getAllCoupons() {
          const couponsFromDb = await apiFetch<CouponTypeDTO[]>(
            "/offer-service/public/all-coupons",
          );
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
        async setTotalPrice(body: TotalPriceFromProductDTORequest[]) {
          const { totalBasePrice, totalDiscountedPrice } =
            await apiFetch<TotalPriceFromProductDTO>(
              "/product-service/public/products/get-total-price",
              {
                method: "POST",
                body,
              },
            );
          set({
            totalBasePrice,
            totalDiscountedPrice,
          });
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

export const usePlaceOrderReqBody = () =>
  useCartStore((state) => ({
    donation: state.donation,
    giftWrap: state.giftWrap,
    selectedCouponCode: state.selectedCouponCode,
  }));
// export const useTotalPrice = () =>
//   useCartStore((state) => ({
//     totalBasePrice: state.totalBasePrice,
//     totalDiscountedPrice: state.totalDiscountedPrice,
//     totalDiscount: state.totalBasePrice - state.totalDiscountedPrice,
//   }));
export const useTotalBasePrice = () =>
  useCartStore((state) => state.totalBasePrice);
export const useTotalDiscountedPrice = () =>
  useCartStore((state) => state.totalDiscountedPrice);
