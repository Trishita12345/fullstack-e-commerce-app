import { useSelectedAddress } from "@/utils/store/address";
import { Box, Button, Group, Stack, Text } from "@mantine/core";

const AddressBox = () => {
  const selectedAddress = useSelectedAddress();
  return (
    <>
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
          <Button variant="outline" color={"primaryDark.7"}>
            <Text size="xs" lts={0.8} fw={500}>
              CHANGE ADDRESS
            </Text>
          </Button>
        </Group>
      ) : (
        <Text>Please login to select address</Text>
      )}
    </>
  );
};

export default AddressBox;
