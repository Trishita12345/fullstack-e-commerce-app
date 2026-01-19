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
import { CartProductsDTO } from "@/constants/types";
import { getProductDetailsAction } from "./(cart)/cartActions";
import Address from "./(address)";
import { useSession } from "@/utils/store/session";

const Checkout = () => {
  const { step } = useParams<{ step: string }>();
  const [visible, { open, close }] = useDisclosure(false);
  const [cartDataLoaded, setCartDataLoaded] = useState<boolean>(false);
  const session = useSession();
  const isLoggedIn = Boolean(session?.user?.id);
  const { getInitialCartData } = useCartActions();
  const cartItems = useCartItems();
  const [cartProducts, setCartProducts] = useState<CartProductsDTO>({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        await getInitialCartData();
        setCartDataLoaded(true);
      })();
    } else { setCartDataLoaded(true); }
  }, []);
  const getCartProducts = async () => {
    try {
      const data = await getProductDetailsAction(cartItems);
      setCartProducts(data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cartDataLoaded) {
      getCartProducts();
    }
  }, [cartItems, cartDataLoaded]);
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
        {step === "cart" && <Cart showLoading={open} stopLoading={close} isLoading={isLoading} cartProducts={cartProducts} />}
        {step === "address" && <Address showLoading={open} stopLoading={close} cartProducts={cartProducts} />}
      </Box>
    </Box>
  );
};

export default Checkout;
