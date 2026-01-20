import loading from "@/app/(customer)/wishlist/loading";
import { AddressDTO, AddressType } from "@/constants/types";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  GridCol,
  Group,
  Radio,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDebouncedCallback, useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

const CustomLabel = ({ label }: { label: string }) => (
  <Text size="xs" display={"inline"} c="dimmed">
    {label}
  </Text>
);
const AddEditAddressForm = ({
  addressData,
  handleAddAddress,
  handleUpdateAddress,
}: {
  addressData?: AddressDTO;
  handleUpdateAddress: (payload: AddressDTO) => void;
  handleAddAddress: (payload: AddressDTO) => void;
}) => {
  const { width } = useViewportSize();
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: addressData || {
      fullName: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      addressType: AddressType.HOME,
      isDefault: false,
      isSelected: false,
    },
    validate: {
      fullName: isNotEmpty("Name cannot be empty"),
      phoneNumber: isNotEmpty("Phone Number cannot be empty"),
      addressLine1: isNotEmpty("AddressLine1 cannot be empty"),
      city: isNotEmpty("City cannot be empty"),
      state: isNotEmpty("State cannot be empty"),
      postalCode: isNotEmpty("Postal Code cannot be empty"),
      country: isNotEmpty("Country cannot be empty"),
    },
  });
  const handleSubmit = (values: AddressDTO) => {
    values.addressId ? handleUpdateAddress(values) : handleAddAddress(values);
  };
  const getDataByPincode = useDebouncedCallback(async (pincode) => {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await res.json();
    if (data.Status === "Error") {
      setCityOptions([]);
      return;
    }
    const tempCityOptions = data[0].PostOffice.map(
      (d: { Name: string; Block: string; District: string }) =>
        `${d.Name}, ${d.Block}, ${d.District}`,
    );
    setCityOptions(tempCityOptions);
    form.setFieldValue("city", tempCityOptions[0]);
    form.setFieldValue("state", data[0].PostOffice[0].State);
  }, 500);

  form.watch("postalCode", (value) => {
    form.setFieldValue("city", "");
    form.setFieldValue("state", "");
    getDataByPincode(value.value);
  });

  useEffect(() => {
    if (addressData?.postalCode) getDataByPincode(addressData?.postalCode);
  }, [addressData?.postalCode]);

  return (
    <>
      <Divider color="black.1" />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box px={4} py={8}>
          <ScrollArea h={width < 900 ? "52vh" : "66vh"}>
            <Box px={16}>
              <Text tt="uppercase" size="xs" fw={600} mb={8}>
                Contact Details
              </Text>
              <TextInput
                {...form.getInputProps("fullName")}
                withAsterisk
                label={<CustomLabel label="Name" />}
                key={form.key("fullName")}
              />
              <TextInput
                leftSection={
                  <Text size="13px" c="black">
                    +91
                  </Text>
                }
                {...form.getInputProps("phoneNumber")}
                withAsterisk
                label={<CustomLabel label="Phone Number" />}
                key={form.key("phoneNumber")}
                type="number"
                max={9999999999}
              />
              <Text tt="uppercase" size="xs" fw={600} mb={8} mt={28}>
                Address
              </Text>
              <Radio.Group
                pb={4}
                name="addressType"
                {...form.getInputProps("addressType")}
                key={form.key("addressType")}
              >
                <Group mt="xs">
                  {Object.values(AddressType).map((i) => (
                    <Radio
                      value={i}
                      label={i}
                      size="xs"
                      color="primaryDark.7"
                    />
                  ))}
                </Group>
              </Radio.Group>
              <TextInput
                {...form.getInputProps("addressLine1")}
                withAsterisk
                label={<CustomLabel label="AddressLine 1" />}
                key={form.key("addressLine1")}
              />
              <TextInput
                {...form.getInputProps("addressLine2")}
                label={<CustomLabel label="AddressLine 2" />}
                key={form.key("addressLine2")}
              />
              <TextInput
                {...form.getInputProps("landmark")}
                label={<CustomLabel label="Landmark" />}
                key={form.key("landmark")}
              />
              <TextInput
                {...form.getInputProps("postalCode")}
                label={<CustomLabel label="Postal Code" />}
                key={form.key("postalCode")}
              />
              <Select
                allowDeselect={false}
                disabled={cityOptions.length === 0}
                {...form.getInputProps("city")}
                label={<CustomLabel label="City" />}
                key={form.key("city")}
                data={cityOptions}
              />
              <TextInput
                disabled
                {...form.getInputProps("state")}
                label={<CustomLabel label="State" />}
                key={form.key("state")}
              />
            </Box>
          </ScrollArea>
        </Box>
        <Box
          p={16}
          display={"flex"}
          w="100%"
          style={{
            gap: "12px",
            borderTop: "2px solid var(--mantine-color-black-1)",
          }}
        >
          <Button
            fullWidth
            type="reset"
            color="primaryDark.7"
            variant="outline"
            onClick={form.reset}
          >
            Reset
          </Button>
          <Button type="submit" bg="primaryDark.7" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddEditAddressForm;
