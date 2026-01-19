"use client";

import { CartProductsDTO } from "@/constants/types";
import {
  Box,
  Grid,
  GridCol,
  Stack,
} from "@mantine/core";
import AddressBox from "./AddressBox";
import CouponBox from "./CouponBox";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import GiftBox from "./GiftBox";
import DonateBox from "./DonateBox";
import PriceDetailsBox from "./PriceDetailsBox";
import CartItemsSection from "./CartItemsSection";
import CartEmpty from "./CartEmpty";
import LoadingCart from "./LoadingCart";

const Cart = ({
  showLoading,
  stopLoading,
  isLoading,
  cartProducts
}: {
  showLoading: () => void;
  stopLoading: () => void;
  isLoading: boolean;
  cartProducts: CartProductsDTO

}) => {
  const { width } = useViewportSize();

  return (
    <Box w={{ base: "90%", md: "85%", lg: "70%" }} mx="auto">
      <>
        {isLoading ? (
          <LoadingCart />
        ) : (
          <>
            {Object.keys(cartProducts).length ? (
              <Grid>
                <GridCol
                  pr={{ base: 0, lg: 24 }}
                  span={{ base: 12, lg: 8 }}
                  style={{
                    borderRight: `${width < 1200 ? 0 : 1
                      }px solid var(--mantine-color-gray-1)`,
                  }}
                >
                  <Stack my={24}>
                    <AddressBox />
                    <CartItemsSection
                      cartProducts={cartProducts}
                      showLoading={showLoading}
                      stopLoading={stopLoading}
                    />
                  </Stack>
                </GridCol>
                <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
                  <Stack my={24} gap={18} pos={"relative"}>
                    <CouponBox cartProducts={cartProducts} />
                    <GiftBox />
                    <DonateBox />
                    <PriceDetailsBox cartProducts={cartProducts} />
                  </Stack>
                </GridCol>
              </Grid>
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
