"use client";
import { Box, Grid, GridCol, Stack } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import PriceDetailsBox from "../(cart)/PriceDetailsBox";
import { CartProductsDTO } from "@/constants/types";
import { useEffect, useState } from "react";
import { unauthorized } from "next/navigation";

import LoadingAddresses from "./LoadingAddresses";
import { useAddressActions, useAllAddresses } from "@/utils/store/address";
import { AddressListSection } from "./AddressListSection";
import { useIsLoggedIn } from "@/utils/store/auth";

const Address = ({
  showLoading,
  stopLoading,
  cartProducts,
  isLoading,
}: {
  showLoading: () => void;
  stopLoading: () => void;
  cartProducts: CartProductsDTO;
  isLoading: boolean;
}) => {
  const isLoggedIn = useIsLoggedIn();
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const addresses = useAllAddresses();
  const { getAllAddresses } = useAddressActions();

  const { width } = useViewportSize();
  const fetchAddress = async () => {
    setAddressLoading(true);
    await getAllAddresses();
    setAddressLoading(false);
  }
  useEffect(() => {
    if (isLoggedIn)
      fetchAddress();
  }, [isLoggedIn]);

  return (
    <Box w={{ base: "90%", md: "85%", lg: "70%" }} mx="auto">
      {isLoading || addressLoading ? (
        <LoadingAddresses />
      ) : (
        <>
          {Object.keys(cartProducts).length > 0 && (
            <Grid>
              <GridCol
                pr={{ base: 0, lg: 24 }}
                span={{ base: 12, lg: 8 }}
                style={{
                  borderRight: `${width < 1200 ? 0 : 1
                    }px solid var(--mantine-color-gray-1)`,
                }}
              >
                <AddressListSection
                  addresses={addresses}
                  showLoading={showLoading}
                  stopLoading={stopLoading}
                />
              </GridCol>
              <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
                <Stack my={16}>
                  <PriceDetailsBox />
                </Stack>
              </GridCol>
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default Address;
