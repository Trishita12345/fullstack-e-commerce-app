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
import { getProductDetailsAction } from "../cartActions";
import Address from "./(address)";
import { useSession } from "@/utils/store/session";
import { useAddressActions } from "@/utils/store/address";
import Payment from "./(payment)";

const Checkout = () => {
  const { step } = useParams<{ step: string }>();
  const [visible, { open, close }] = useDisclosure(false);
  const [cartDataLoaded, setCartDataLoaded] = useState<boolean>(false);
  const session = useSession();
  const isLoggedIn = Boolean(session?.user?.id);
  const { getInitialCartData, setCartItems } = useCartActions();
  const cartItems = useCartItems();
  const [cartProducts, setCartProducts] = useState<CartProductsDTO>({});
  const [isLoading, setIsLoading] = useState(true);
  const { getAllAddresses } = useAddressActions();

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        await getInitialCartData();
        setCartDataLoaded(true);
      })();
    } else {
      setCartDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        await getAllAddresses();
      })();
    }
  }, []);

  const getCartProducts = async () => {
    try {
      const data = await getProductDetailsAction(cartItems);
      setCartProducts(data);
      const updatedCart = cartItems.map((c) => ({
        ...c,
        updatedQuantity:
          data[c.productItemId].availableStock < c.quantity
            ? data[c.productItemId].availableStock
            : c.quantity,
      }));
      let updatedCartOutOfStock: CartItemDTO[] = [];
      let updatedCartInStock: CartItemDTO[] = [];
      updatedCart.forEach((i) => {
        if (i.updatedQuantity === 0) {
          updatedCartOutOfStock.push(i);
        } else updatedCartInStock.push(i);
      });
      setCartItems([...updatedCartInStock, ...updatedCartOutOfStock]);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cartDataLoaded) {
      getCartProducts();
    }
  }, [cartDataLoaded]);
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
