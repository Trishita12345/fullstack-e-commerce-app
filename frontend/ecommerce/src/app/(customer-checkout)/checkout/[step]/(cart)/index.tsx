"use client";

import { CartItemDTO, CartProductsDTO } from "@/constants/types";
import { useCartActions, useCartItems } from "@/utils/store/cart";
import {
  Box,
  Grid,
  GridCol,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
} from "@mantine/core";
import AddressBox from "./AddressBox";
import CouponBox from "./CouponBox";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import GiftBox from "./GiftBox";
import DonateBox from "./DonateBox";
import PriceDetailsBox from "./PriceDetailsBox";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiFetch";
import CartItemsSection from "./CartItemsSection";
import CartEmpty from "./CartEmpty";
import { getProductDetailsAction } from "./cartActions";

const Cart = () => {
  const [cartDataLoaded, setCartDataLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visible, { open, close }] = useDisclosure(false);
  const { width } = useViewportSize();
  const { data: session } = authClient.useSession();
  const isLoggedIn = Boolean(session?.user?.id);
  const { getInitialCartData } = useCartActions();
  const cartItems = useCartItems();
  const [cartProducts, setCartProducts] = useState<CartProductsDTO | undefined>(
    undefined
  );
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        await getInitialCartData();
        setCartDataLoaded(true);
      })();
    }
  }, [isLoggedIn]);
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
    <Box w={{ base: "90%", md: "85%", lg: "70%" }} mx="auto">
      <>
        {isLoading ? (
          <Box h={300} bg="red">
            Cart Shimmer Loading...
          </Box>
        ) : (
          <>
            {cartProducts ? (
              <Box pos="relative">
                <LoadingOverlay
                  visible={visible}
                  loaderProps={{
                    children: <Loader size={30} color="primaryDark.7" />,
                  }}
                />
                <Grid>
                  <GridCol
                    pr={{ base: 0, lg: 24 }}
                    span={{ base: 12, lg: 8 }}
                    style={{
                      borderRight: `${
                        width < 1200 ? 0 : 1
                      }px solid var(--mantine-color-gray-1)`,
                    }}
                  >
                    <Stack my={24}>
                      <AddressBox />
                      <CartItemsSection
                        cartProducts={cartProducts}
                        showLoading={open}
                        stopLoading={close}
                      />
                    </Stack>
                  </GridCol>
                  <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
                    <Stack my={24} gap={18}>
                      <CouponBox cartProducts={cartProducts} />
                      <GiftBox />
                      <DonateBox />
                      <PriceDetailsBox cartProducts={cartProducts} />
                    </Stack>
                  </GridCol>
                </Grid>
              </Box>
            ) : (
              <CartEmpty />
            )}
          </>
        )}
      </>
    </Box>
  );
};

export default Cart;
