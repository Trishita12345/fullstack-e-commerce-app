import { AddressDTO } from "@/constants/types";
import {
  useAddressActions,
  useAllAddresses,
  useSelectedAddress,
  useSelectedAddressId,
} from "@/utils/store/address";
import {
  Card,
  Group,
  RadioIndicator,
  Stack,
  Badge,
  Button,
  Text,
  Divider,
  Box,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const AddressCard = ({
  address,
  selectedLocal,
  closeModal,
  setSelectedLocal,
  setModalState,
}: {
  address: AddressDTO;
  selectedLocal: AddressDTO | undefined;
  setSelectedLocal: (add: AddressDTO | undefined) => void;
  closeModal: () => void;
  setModalState: (val: {
    type: "addressList" | "addressForm";
    addressData: AddressDTO | undefined;
  }) => void;
}) => {
  const selectedAddressId = useSelectedAddressId();
  const { setSelectedAddressId } = useAddressActions();

  const updateSelected = () => {
    setSelectedAddressId(address.addressId);
    closeModal();
  };

  return (
    <Card
      onClick={() => setSelectedLocal(address)}
      style={{ cursor: "pointer" }}
    >
      <Group align="baseline" gap={16}>
        <RadioIndicator
          color={"primaryDark.7"}
          checked={selectedLocal?.addressId == address.addressId}
        />
        <Stack w={{ base: "80%", md: "93%" }} gap={4}>
          <Group gap={4}>
            <Text size="xs" fw={600} lts={0.7}>
              {address.fullName}
            </Text>
            {address.isDefault && (
              <Text size="xs" lts={0.7}>
                (Default)
              </Text>
            )}
            <Badge
              variant={address.addressType == "HOME" ? "filled" : "outline"}
              color="green.7"
            >
              {address.addressType}
            </Badge>
          </Group>
          {selectedLocal?.addressId == address.addressId ? (
            <>
              <Text size="xs" c={"black.8"} lts={0.4}>
                {address.addressLine1 + ", "}
                {address.addressLine2 && address.addressLine2 + ", "}
                {address.landmark && address.landmark + ", "}
                {address.city}
                <br />
                {address.state} - {address.postalCode}, {address.country}
              </Text>
              <Text size="xs" c={"black.8"} lts={0.4} fw={500}>
                Mobile - {address.phoneNumber}
              </Text>
              <Group>
                <Button
                  w="max-content"
                  color={"primaryDark.7"}
                  size="xs"
                  mt={12}
                  variant="outline"
                  disabled={selectedAddressId == address.addressId}
                  onClick={updateSelected}
                >
                  <Text size="xs" tt="uppercase">
                    {selectedAddressId == address.addressId
                      ? "Delivering here"
                      : "Deliver here"}
                  </Text>
                </Button>
                <Button
                  w="max-content"
                  color={"primaryDark.7"}
                  size="xs"
                  mt={12}
                  variant="outline"
                  onClick={() =>
                    setModalState({
                      type: "addressForm",
                      addressData: address,
                    })
                  }
                >
                  <Text size="xs" tt="uppercase">
                    EDIT
                  </Text>
                </Button>
              </Group>
            </>
          ) : (
            <Text
              size="xs"
              c={"black.8"}
              lts={0.4}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "280px",
              }}
            >
              {address.addressLine1 + ", "}
              {address.addressLine2 && address.addressLine2 + ", "}
              {address.landmark && address.landmark + ", "}
              {address.city + ", "}
              {address.state} - {address.postalCode}, {address.country}
            </Text>
          )}
        </Stack>
      </Group>
    </Card>
  );
};
const AddressListingForCart = ({
  closeModal,
  setModalState,
}: {
  closeModal: () => void;
  setModalState: (val: {
    type: "addressList" | "addressForm";
    addressData: AddressDTO | undefined;
  }) => void;
}) => {
  const addresses = useAllAddresses();
  const defaultAddress = addresses?.find((a) => a.isDefault);
  const selectedAddress = useSelectedAddress();
  const selectedAddressId = useSelectedAddressId();
  const [selectedLocal, setSelectedLocal] = useState<AddressDTO | undefined>(
    selectedAddress,
  );
  return (
    <>
      <Divider color="black.1" />
      <Box bg={"black.1"}>
        <Stack py={8} gap={8}>
          <Group justify="space-between" pl={24}>
            <Text tt="uppercase" size="xs" fw={700}>
              SAVED ADDRESS
            </Text>
            <Button
              variant="transparent"
              leftSection={<IconPlus size={16} />}
              color="primaryDark.9"
              onClick={() =>
                setModalState({
                  type: "addressForm",
                  addressData: undefined,
                })
              }
            >
              <Text tt="uppercase" size="xs" fw={700}>
                Add new Address
              </Text>
            </Button>
          </Group>
          {defaultAddress && (
            <AddressCard
              address={defaultAddress}
              selectedLocal={selectedLocal}
              setSelectedLocal={setSelectedLocal}
              closeModal={closeModal}
              setModalState={setModalState}
            />
          )}
          {/* {selectedAddress && defaultAddress?.addressId !== selectedAddressId && (
        <AddressCard
          address={selectedAddress}
          selectedLocal={selectedLocal}
          setSelectedLocal={setSelectedLocal}
          closeModal={closeModal}
        />
      )} */}
          {addresses &&
            addresses?.length > 0 &&
            addresses
              //   .filter((a) => !(a.isDefault || a.addressId === selectedAddressId))
              .filter((a) => !a.isDefault)
              .map((i) => (
                <AddressCard
                  address={i}
                  selectedLocal={selectedLocal}
                  setSelectedLocal={setSelectedLocal}
                  closeModal={closeModal}
                  setModalState={setModalState}
                />
              ))}
        </Stack>
        <Card>
          <Button
            variant="outline"
            leftSection={<IconPlus size={16} />}
            color="primaryDark.9"
            onClick={() =>
              setModalState({
                type: "addressForm",
                addressData: undefined,
              })
            }
          >
            <Text tt="uppercase" size="xs" fw={700}>
              Add new Address
            </Text>
          </Button>
        </Card>
      </Box>
    </>
  );
};

export default AddressListingForCart;
