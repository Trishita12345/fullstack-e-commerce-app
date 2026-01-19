"use client"
import { Box, Button, Grid, GridCol, Group, Stack, Text } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks";
import PriceDetailsBox from "../(cart)/PriceDetailsBox";
import { AddressDTO, AddressType, CartProductsDTO } from "@/constants/types";
import AddressCard from "./AddressCard";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { unauthorized } from "next/navigation";
import { useSession } from "@/utils/store/session";

const Address = (
    { showLoading, stopLoading, cartProducts }: {
        showLoading: () => void;
        stopLoading: () => void;
        cartProducts: CartProductsDTO
    }) => {
    const session = useSession();
    const isLoggedIn = Boolean(session?.session?.userId)
    console.log("isLoggedId", isLoggedIn)
    if (!isLoggedIn) unauthorized();
    const [checked, setChecked] = useState<string | undefined>()
    const addressDTOS: AddressDTO[] = [{
        addressId: '213123-213123-123123-213',
        fullName: "Trishita Majumder",
        addressType: AddressType.HOME,
        addressLine1: "Lad Colive PG, Green Glen Layout",
        addressLine2: "Bellandur",
        landmark: "Beside Enrich Salon",
        city: "Banglore",
        state: "Karnataka",
        postalCode: "5601013",
        country: "India",
        phoneNumber: '7690292019',
        isDefault: true,
    }, {
        addressId: '21312213-213123-12123213123-213',
        fullName: "Trishita Majumder",
        addressType: AddressType.OFFICE,
        addressLine1: "Lad Colive PG, Green Glen Layout",
        addressLine2: "Bellandur",
        landmark: "Beside Enrich Salon",
        city: "Banglore",
        state: "Karnataka",
        postalCode: "5601013",
        country: "India",
        phoneNumber: '7690292019',
        isDefault: false,
    },
    {
        addressId: '213123-21313213123-123123-213',
        fullName: "Trishita Majumder",
        addressType: AddressType.HOME,
        addressLine1: "Lad Colive PG, Green Glen Layout",
        addressLine2: "Bellandur",
        landmark: "Beside Enrich Salon",
        city: "Banglore",
        state: "Karnataka",
        postalCode: "5601013",
        country: "India",
        phoneNumber: '7690292019',
        isDefault: false,
    },
    {

        addressId: '213123-2131123123-123123-213',
        fullName: "Trishita Majumder",
        addressType: AddressType.OTHER,
        addressLine1: "Lad Colive PG, Green Glen Layout",
        addressLine2: "Bellandur",
        landmark: "Beside Enrich Salon",
        city: "Banglore",
        state: "Karnataka",
        postalCode: "5601013",
        country: "India",
        phoneNumber: '7690292019',
        isDefault: false,

    }]
    const defaultAddress = addressDTOS.filter(address => address.isDefault)[0]
    const otherAddress = addressDTOS.filter(address => !address.isDefault)
    const { width } = useViewportSize();
    return (
        <Box w={{ base: "90%", md: "85%", lg: "70%" }} mx="auto">
            {
                (Object.keys(cartProducts).length > 0) &&
                <Grid>
                    <GridCol
                        pr={{ base: 0, lg: 24 }}
                        span={{ base: 12, lg: 8 }}
                        style={{
                            borderRight: `${width < 1200 ? 0 : 1
                                }px solid var(--mantine-color-gray-1)`,
                        }}
                    >
                        <Stack my={16} gap={18}>
                            <Group justify="space-between">
                                <Text size="lg" fw={600}>Select Delivery Address</Text>
                                <Button variant="outline" color="primaryDark.7">Add New Adress</Button>
                            </Group>
                            <Text size="10px" c={"dimmed"} fw={600} tt={"uppercase"} lts={.7}>Default address</Text>
                            <AddressCard checked={checked} setChecked={setChecked} address={defaultAddress} />
                            <Text size="10px" c={"dimmed"} fw={600} tt={"uppercase"} lts={.7}>Other address</Text>
                            {
                                otherAddress.map(
                                    address => (
                                        <AddressCard key={address.addressId} checked={checked} setChecked={setChecked} address={address} />
                                    ))
                            }
                        </Stack>
                    </GridCol>
                    <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
                        <Stack my={16}>
                            <PriceDetailsBox cartProducts={cartProducts} />
                        </Stack>
                    </GridCol>
                </Grid>
            }

        </Box>
    );
}

export default Address;