import { AddressDTO } from "@/constants/types";
import { Stack, Group, Button, Text } from "@mantine/core";
import AddressCard from "./AddressCard";
import { IconMapOff } from "@tabler/icons-react";

export const AddressListSection = (
    { addresses, showLoading, stopLoading }:
        {
            addresses: AddressDTO[] | undefined,
            showLoading: () => void;
            stopLoading: () => void;
        }) => {
    const defaultAddress =
        addresses && addresses.find((address) => address.isDefault);
    const otherAddress =
        (addresses && addresses.filter((address) => !address.isDefault)) || [];
    return (
        <Stack my={16} gap={18}>
            <Group justify="space-between">
                <Text size="lg" fw={600}>
                    Select Delivery Address
                </Text>
                <Button variant="outline" color="primaryDark.7">
                    Add New Adress
                </Button>
            </Group>

            {defaultAddress && otherAddress.length ? <>
                <Text
                    size="10px"
                    c={"dimmed"}
                    fw={600}
                    tt={"uppercase"}
                    lts={0.7}
                >
                    Default address
                </Text>
                {
                    defaultAddress && (
                        <AddressCard
                            address={defaultAddress}
                            showLoading={showLoading}
                            stopLoading={stopLoading}
                        />
                    )
                }
                {
                    otherAddress?.length > 0 && (
                        <>
                            <Text
                                size="10px"
                                c={"dimmed"}
                                fw={600}
                                tt={"uppercase"}
                                lts={0.7}
                            >
                                Other address
                            </Text>
                            {otherAddress.map((address) => (
                                <AddressCard
                                    key={address.addressId}
                                    address={address}
                                    showLoading={showLoading}
                                    stopLoading={stopLoading}
                                />
                            ))}
                        </>
                    )
                }</> :
                <Stack align="center" mt={48}>
                    <IconMapOff size={250} stroke={'.2px'} color="var(--mantine-color-primaryDark-7)" />
                    <Text mt={16} fw={500} c={"dimmed"} lts={.7} ta={"center"}>No address has been added. Please add one before shopping.</Text>
                </Stack>
            }
        </Stack>
    )
};