"use client";
import CustomerCheckoutHeader, {
  StepType,
} from "@/(components)/CustomerCheckoutHeader";
import Cart from "./(cart)";
import { Box, Loader, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useCartActions, useCartItems } from "@/utils/store/cart";
import { CartItemDTO, CartProductsDTO } from "@/constants/types";
import {
  getCartItemsAction,
  getProductDetailsAction,
  updateOverallCartAction,
} from "../cartActions";
import Address from "./(address)";
import { useSession } from "@/utils/store/session";
import { useAddressActions } from "@/utils/store/address";
import Payment from "./(payment)";
import { apiFetch } from "@/lib/apiFetch";

const Checkout = () => {
  const { step } = useParams<{ step: string }>();
  const [visible, { open, close }] = useDisclosure(false);
  const [cartDataLoaded, setCartDataLoaded] = useState<boolean>(false);
  const session = useSession();
  const isLoggedIn = Boolean(session?.user?.id);
  const { setCartItems } = useCartActions();
  const cartItems = useCartItems();
  const [cartProducts, setCartProducts] = useState<CartProductsDTO>({});
  const [isLoading, setIsLoading] = useState(true);
  const { getAllAddresses } = useAddressActions();

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        await getAllAddresses();
      })();
    }
  }, []);

  const getCartProducts = async (cartItems: CartItemDTO[]) => {
    try {
      if (cartItems.length === 0) {
        setCartItems([]);
        setIsLoading(false);
        return;
      }
      const data = await getProductDetailsAction(cartItems);
      setCartProducts(data);
      const updatedCart = cartItems.map((c) => ({
        ...c,
        updatedQuantity:
          data[c.productItemId].availableStock < c.quantity
            ? data[c.productItemId].availableStock
            : c.quantity,
        isSelected:
          data[c.productItemId].availableStock === 0 ? false : c.isSelected,
      }));
      if (isLoggedIn) {
        await updateOverallCartAction(updatedCart);
      }
      let updatedCartOutOfStock: CartItemDTO[] = [];
      let updatedCartInStock: CartItemDTO[] = [];
      updatedCart.forEach((i) => {
        if (i.updatedQuantity === 0) {
          updatedCartOutOfStock.push(i);
        } else updatedCartInStock.push(i);
      });
      setCartItems([...updatedCartInStock, ...updatedCartOutOfStock]);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (isLoggedIn) {
          setIsLoading(true);
          const cartItemsFromDb = await getCartItemsAction();
          getCartProducts(cartItemsFromDb);
        } else {
          getCartProducts(cartItems);
        }
      } catch (err) {
        setIsLoading(false);
      }
    })();
  }, [isLoggedIn]);

  return (
    <Box pos="relative">
      <LoadingOverlay
        zIndex={10000}
        visible={visible}
        loaderProps={{
          children: <Loader size={30} color="primaryDark.7" />,
        }}
      />
      <CustomerCheckoutHeader step={step as StepType} />
      <Box py={8}>
        {step === "cart" && (
          <Cart
            showLoading={open}
            stopLoading={close}
            isLoading={isLoading}
            cartProducts={cartProducts}
          />
        )}
        {step === "address" && (
          <Address
            showLoading={open}
            stopLoading={close}
            cartProducts={cartProducts}
            isLoading={isLoading}
          />
        )}
        {step === "payment" && (
          <Payment
            showLoading={open}
            stopLoading={close}
            cartProducts={cartProducts}
          />
        )}
      </Box>
    </Box>
  );
};

export default Checkout;
