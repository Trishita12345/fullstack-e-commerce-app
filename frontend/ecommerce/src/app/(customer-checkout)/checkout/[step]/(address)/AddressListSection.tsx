import { AddressDTO } from "@/constants/types";
import { Stack, Group, Button, Text, Modal } from "@mantine/core";
import AddressCard from "./AddressCard";
import { IconMapOff } from "@tabler/icons-react";
import { notify } from "@/utils/helperFunctions";
import { updateAddress } from "../../addressActions";
import { useAddressActions } from "@/utils/store/address";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import AddEditAddressAddressForm from "./AddEditAddressAddressForm";

export const AddressListSection = ({
  addresses,
  showLoading,
  stopLoading,
}: {
  addresses: AddressDTO[] | undefined;
  showLoading: () => void;
  stopLoading: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [addressDataForPopup, setAddressDataForPopup] = useState<
    AddressDTO | undefined
  >(undefined);
  const defaultAddress =
    addresses && addresses.find((address) => address.isDefault);
  const otherAddress =
    (addresses && addresses.filter((address) => !address.isDefault)) || [];
  const { getAllAddresses } = useAddressActions();
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
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`${addressDataForPopup ? "Update" : "Add"} Address`}
      >
        <AddEditAddressAddressForm
          addressData={addressDataForPopup}
          handleAddAddress={handleAddAddress}
          handleUpdateAddress={handleUpdateAddress}
        />
      </Modal>
      <Stack my={16} gap={18}>
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Select Delivery Address
          </Text>
          <Button variant="outline" color="primaryDark.7" onClick={open}>
            Add New Adress
          </Button>
        </Group>

        {defaultAddress && otherAddress.length ? (
          <>
            <Text size="10px" c={"dimmed"} fw={600} tt={"uppercase"} lts={0.7}>
              Default address
            </Text>
            {defaultAddress && (
              <AddressCard
                address={defaultAddress}
                showLoading={showLoading}
                stopLoading={stopLoading}
                open={open}
                close={close}
                setAddressData={setAddressDataForPopup}
                handleUpdateAddress={handleUpdateAddress}
              />
            )}
            {otherAddress?.length > 0 && (
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
                    address={defaultAddress}
                    showLoading={showLoading}
                    stopLoading={stopLoading}
                    open={open}
                    close={close}
                    setAddressData={setAddressDataForPopup}
                    handleUpdateAddress={handleUpdateAddress}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <Stack align="center" mt={48}>
            <IconMapOff
              size={250}
              stroke={".2px"}
              color="var(--mantine-color-primaryDark-7)"
            />
            <Text mt={16} fw={500} c={"dimmed"} lts={0.7} ta={"center"}>
              No address has been added. Please add one before shopping.
            </Text>
          </Stack>
        )}
      </Stack>
    </>
  );
};
