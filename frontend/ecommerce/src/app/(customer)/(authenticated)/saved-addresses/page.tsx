"use client"
import { AddressListSection } from "@/app/(customer-checkout)/checkout/[step]/(address)/AddressSection";
import LoadingAddresses from "@/app/(customer-checkout)/checkout/[step]/(address)/LoadingAddresses";
import { useAddressActions, useAllAddresses } from "@/utils/store/address";
import { Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

const SavedAddresses = () => {
    const [visible, { open, close }] = useDisclosure();
    const addresses = useAllAddresses();
    const { getAllAddresses } = useAddressActions();

    return (
        <Box w={{ base: "90%", md: "85%", lg: "70%" }} mx="auto" my={32}>
            {visible ? (
                <LoadingAddresses />
            ) : (
                <AddressListSection showLoading={open} stopLoading={close} addresses={addresses} />
            )}
        </Box>
    );
}

export default SavedAddresses;