import { useAddressActions, useSelectedAddress } from "@/utils/store/address";
import { Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddEditAddressForm from "../(address)/AddEditAddressForm";
import { addAddress, updateAddress } from "../../addressActions";
import { AddressDTO } from "@/constants/types";
import { notify } from "@/utils/helperFunctions";
import { useState } from "react";
import AddressListingForCart from "./AddressListingForCart";
import LoginComponent, { LoggedOutProps } from "@/(components)/LoginComponent";

const AddressBox = ({
  showLoading,
  stopLoading,
}: {
  showLoading: () => void;
  stopLoading: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalState, setModalState] = useState<{
    type: "addressList" | "addressForm";
    addressData: AddressDTO | undefined;
  }>({ type: "addressList", addressData: undefined });
  const selectedAddress = useSelectedAddress();
  const { getAllAddresses, setSelectedAddressId } = useAddressActions();
  const handleAddAddress = async (payload: AddressDTO) => {
    try {
      showLoading();
      const addressId = await addAddress(payload);
      await getAllAddresses();
      setSelectedAddressId(addressId);
      notify({
        variant: "success",
        title: "Success!",
        message: "Address added succesfully!",
      });
      handleModalClose();
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
      setSelectedAddressId(payload.addressId);
      notify({
        variant: "success",
        title: "Success!",
        message: "Address updated succesfully!",
      });
      handleModalClose();
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

  const handleModalClose = () => {
    setModalState({ type: "addressList", addressData: undefined });
    close();
  };

  const LoggedIn = () => (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={handleModalClose}
        title={
          <Text tt="uppercase" size="sm" fw={600} c="black.7">
            {modalState.type === "addressList"
              ? "Select Delivery"
              : !modalState.addressData
                ? "Add New "
                : "Edit "}{" "}
            Address
          </Text>
        }
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        {modalState.type === "addressList" ? (
          <AddressListingForCart
            closeModal={handleModalClose}
            setModalState={setModalState}
          />
        ) : (
          <AddEditAddressForm
            addressData={modalState.addressData}
            handleAddAddress={handleAddAddress}
            handleUpdateAddress={handleUpdateAddress}
          />
        )}
      </Modal>
      {selectedAddress ? (
        <Group
          bd={"1px solid gray.1"}
          p={16}
          bdrs={4}
          bg={"primary.0"}
          justify="space-between"
        >
          <Stack gap={4}>
            <Text size="xs">
              Deliver to:{" "}
              <b style={{ letterSpacing: 0.5 }}>{selectedAddress.fullName}</b>
            </Text>
            <Text size="xs" c={"black.8"} lts={0.4}>
              {selectedAddress.addressLine1}
              {selectedAddress.addressLine2 &&
                ", " +
                selectedAddress.addressLine2 +
                selectedAddress.landmark &&
                ", " + selectedAddress.landmark}
              <br /> {selectedAddress.city + ", " + selectedAddress.state} -{" "}
              {selectedAddress.postalCode}, {selectedAddress.country}
            </Text>
            <Text size="xs" c={"black.8"} lts={0.4} fw={500}>
              Mobile - {selectedAddress.phoneNumber}
            </Text>
          </Stack>
          <Button variant="outline" color={"primaryDark.7"} onClick={open}>
            <Text size="xs" lts={0.8} fw={500}>
              CHANGE ADDRESS
            </Text>
          </Button>
        </Group>
      ) : (
        <Box bd={"1px solid gray.1"} p={16} bdrs={4} bg={"primary.0"}>
          <Button variant="outline" color={"primaryDark.7"} onClick={open}>
            <Text size="xs" lts={0.8} fw={500} tt="uppercase">
              Add New Address
            </Text>
          </Button>
        </Box>
      )}
    </>
  );
  const LoggedOut = ({ redirectToLogin }: LoggedOutProps) => (
    <Box bd={"1px solid gray.1"} p={16} bdrs={4} bg={"primary.0"}>
      <Group gap={4}>
        <Button
          variant="transparent"
          color="primaryDark.9"
          px={0}
          onClick={redirectToLogin}
        >
          <Text fw={700} size="14px">
            Login
          </Text>
        </Button>
        <Text size="14px" c={"black.7"}>
          to add Delivery Details
        </Text>
      </Group>
    </Box>
  );
  return (
    <LoginComponent
      LoggedInComponent={LoggedIn}
      NotLoggedInComponent={LoggedOut}
    />
  );
};

export default AddressBox;
