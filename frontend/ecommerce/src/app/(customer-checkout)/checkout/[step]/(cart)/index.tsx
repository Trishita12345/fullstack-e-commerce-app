"use client";

import { CartItemDTO, CartProductsDTO } from "@/constants/types";
import { useCartActions, useCartItems } from "@/utils/store/cart";
import { Box, Grid, GridCol, Group, Stack } from "@mantine/core";
import AddressBox from "./AddressBox";
import CouponBox from "./CouponBox";
import { useViewportSize } from "@mantine/hooks";
import GiftBox from "./GiftBox";
import DonateBox from "./DonateBox";
import PriceDetailsBox from "./PriceDetailsBox";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiFetch";
import CartItemsSection from "./CartItemsSection";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  const { width } = useViewportSize();
  const { data: session } = authClient.useSession();
  const isLoggedIn = Boolean(session?.user?.id);
  const { getInitialCartData } = useCartActions();
  const cartItems = useCartItems();
  const [cartProducts, setCartProducts] = useState<CartProductsDTO>({});
  useEffect(() => {
    if (isLoggedIn) {
      getInitialCartData();
    }
  }, [isLoggedIn]);

  const getCartProducts = async () => {
    const data = await apiFetch<CartProductsDTO>(
      "/product-service/public/products/cart-item-details",
      {
        method: "POST",
        body: cartItems.map((ci) => ci.productItemId),
      }
    );
    setCartProducts(data);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      getCartProducts();
    }
  }, [cartItems]);

  return (
    <Box w={{ base: "90%", md: "85%", lg: "70%" }} mx="auto">
      {Object.keys(cartProducts).length > 0 ? (
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
              <CartItemsSection cartProducts={cartProducts} />
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
            <Stack my={24} gap={36}>
              <CouponBox />
              <GiftBox />
              <DonateBox />
              <PriceDetailsBox />
            </Stack>
          </GridCol>
        </Grid>
      ) : (
        <CartEmpty />
      )}
    </Box>
  );
};

export default Cart;
