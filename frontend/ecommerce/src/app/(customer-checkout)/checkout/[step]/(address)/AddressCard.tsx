import { AddressDTO, AddressType } from "@/constants/types";
import { notify } from "@/utils/helperFunctions";
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
import { addAddress, deleteAddress, updateAddress } from "../../addressActions";
import {
  useAddressActions,
  useAllAddresses,
  useSelectedAddressId,
} from "@/utils/store/address";

const AddressCard = ({
  showLoading,
  stopLoading,
  address,
}: {
  showLoading: () => void;
  stopLoading: () => void;
  address: AddressDTO;
}) => {
  const selectedAddressId = useSelectedAddressId();
  const { setSelectedAddressId, getAllAddresses } = useAddressActions();

  const handleAddAddress = async (payload: AddressDTO) => {
    try {
      showLoading();
      await updateAddress(payload);
      await getAllAddresses();
      notify({
        variant: "success",
        title: "Success!",
        message: "Address added succesfully!",
      });
    } catch {
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to add address!",
      });
    } finally {
      stopLoading();
    }
  };

  const handleUpdateAddress = async (payload: AddressDTO) => {
    try {
      showLoading();
      await updateAddress(payload);
      await getAllAddresses();
      notify({
        variant: "success",
        title: "Success!",
        message: "Address updated succesfully!",
      });
    } catch {
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to update address!",
      });
    } finally {
      stopLoading();
    }
  };
  const handleDeleteAddress = async () => {
    try {
      if (address.isDefault) {
        notify({
          variant: "error",
          title: "Error!",
          message:
            "Please mark any other address as default or create a new one to proceed!",
        });
      } else if (address.addressId === selectedAddressId) {
        notify({
          variant: "error",
          title: "Error!",
          message:
            "Please select any other address or create a new one to proceed!",
        });
      } else {
        showLoading();
        await deleteAddress(address.addressId || "");
        await getAllAddresses();
        notify({
          variant: "success",
          title: "Success!",
          message: "Address deleted succesfully!",
        });
      }
    } catch {
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to delete address!",
      });
    } finally {
      stopLoading();
    }
  };
  const updateSelected = () => {
    setSelectedAddressId(address.addressId);
  };

  const handleMarkAsDefault = () => {
    handleUpdateAddress({ ...address, isDefault: true });
  };

  return (
    <Card
      radius="md"
      shadow="md"
      bd={`1.5px solid ${selectedAddressId == address.addressId ? "var(--mantine-color-gray-1)" : "1.5px solid white"}`}
    >
      <Group align="baseline" gap={16}>
        <RadioIndicator
          color={"primaryDark.7"}
          checked={selectedAddressId == address.addressId}
          onClick={updateSelected}
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
                onClick={handleMarkAsDefault}
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
            <Button
              color={"black.7"}
              variant="outline"
              onClick={handleDeleteAddress}
            >
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
