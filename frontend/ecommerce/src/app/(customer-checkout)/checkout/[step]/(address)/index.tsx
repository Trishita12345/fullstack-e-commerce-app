"use client";
import {
  Box,
  Button,
  Grid,
  GridCol,
  Group,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import PriceDetailsBox from "../(cart)/PriceDetailsBox";
import { AddressDTO, CartProductsDTO } from "@/constants/types";
import AddressCard from "./AddressCard";
import { useEffect, useState } from "react";
import { unauthorized } from "next/navigation";
import { useSession } from "@/utils/store/session";
import LoadingAddresses from "./LoadingAddresses";
import { useAddressActions, useAllAddresses } from "@/utils/store/address";
import { AddressListSection } from "./AddressListSection";
import AddEditAddressAddressForm from "./AddEditAddressAddressForm";
import { notify } from "@/utils/helperFunctions";
import { updateAddress } from "../../addressActions";

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
  const session = useSession();
  const isLoggedIn = Boolean(session?.session?.userId);
  if (!isLoggedIn) unauthorized();
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const addresses = useAllAddresses();
  const { getAllAddresses } = useAddressActions();

  const { width } = useViewportSize();

  useEffect(() => {
    (async () => {
      setAddressLoading(true);
      await getAllAddresses();
      setAddressLoading(false);
    })();
  }, []);

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
                  borderRight: `${
                    width < 1200 ? 0 : 1
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
                  <PriceDetailsBox cartProducts={cartProducts} />
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
