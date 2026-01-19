"use client";
import { AddressListSection } from "@/app/(customer-checkout)/checkout/[step]/(address)/AddressListSection";
import LoadingAddresses from "@/app/(customer-checkout)/checkout/[step]/(address)/LoadingAddresses";
import { useAddressActions, useAllAddresses } from "@/utils/store/address";
import { Box, Loader, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

const SavedAddresses = () => {
  const [visible, { open, close }] = useDisclosure();
  const addresses = useAllAddresses();
  const { getAllAddresses } = useAddressActions();
  const [addressLoading, setAddressLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setAddressLoading(true);
      await getAllAddresses();
      setAddressLoading(false);
    })();
  }, []);

  return (
    <Box w={{ base: "90%", md: "85%", lg: "70%" }} mx="auto" my={32}>
      {addressLoading ? (
        <LoadingAddresses />
      ) : (
        <Box pos="relative">
          <LoadingOverlay
            zIndex={10000}
            visible={visible}
            loaderProps={{
              children: <Loader size={30} color="primaryDark.7" />,
            }}
          />
          <AddressListSection
            showLoading={open}
            stopLoading={close}
            addresses={addresses}
          />
        </Box>
      )}
    </Box>
  );
};

export default SavedAddresses;
