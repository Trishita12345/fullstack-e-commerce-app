import { AddressDTO, AddressType } from "@/constants/types";
import {
  Badge,
  Button,
  Card,
  Group,
  RadioCard,
  RadioIndicator,
  Stack,
  Text,
} from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";

const AddressCard = ({
  checked,
  setChecked,
  address,
}: {
  checked: string | undefined;
  setChecked: Dispatch<SetStateAction<string | undefined>>;
  address: AddressDTO;
}) => {
  return (
    <Card
      radius="md"
      shadow="md"
      bd={`1.5px solid ${checked == address.addressId ? "var(--mantine-color-gray-1)" : "1.5px solid white"}`}
    >
      <Group align="baseline" gap={16}>
        <RadioIndicator
          color={"primaryDark.7"}
          checked={checked == address.addressId}
          onClick={() => setChecked(address.addressId)}
        />
        <Stack w={{ base: "90%", md: "93%" }}>
          <Group justify="space-between">
            <Group>
              <Text size="xs" fw={600} lts={0.7}>
                {address.fullName}
              </Text>
              <Badge
                variant={address.addressType == "HOME" ? "filled" : "outline"}
                color="green.7"
              >
                {address.addressType}
              </Badge>
            </Group>
            {!address.isDefault && (
              <Button
                size="xs"
                variant="transparent"
                color="gray.8"
                styles={{
                  label: {
                    borderBottom: "1.5px dashed var(--mantine-color-black-7)",
                  },
                }}
              >
                Mark as Default
              </Button>
            )}
          </Group>
          <Text size="xs" c={"black.8"} lts={0.4}>
            {address.addressLine1}
            {address.addressLine2 && ", " + address.addressLine2}
            <br />{" "}
            {address.landmark + ", " && address.landmark + ", " + address.city}
            <br />
            {address.state} - {address.postalCode}, {address.country}
          </Text>
          <Text size="xs" c={"black.8"} lts={0.4} fw={500}>
            Mobile - {address.phoneNumber}
          </Text>
          <Group>
            <Button color={"black.7"} variant="outline">
              Remove
            </Button>
            <Button color={"black.7"} variant="outline">
              Edit
            </Button>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};

export default AddressCard;
