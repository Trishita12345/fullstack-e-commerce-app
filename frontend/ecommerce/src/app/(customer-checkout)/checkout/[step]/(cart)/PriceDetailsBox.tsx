import { CartProductsDTO } from "@/constants/types";
import { formattedPrice } from "@/utils/helperFunctions";
import { useCartItems } from "@/utils/store/cart";
import { Button, Divider, Group, Stack, Text } from "@mantine/core";

const PriceDetailsBox = ({
  cartProducts,
}: {
  cartProducts: CartProductsDTO;
}) => {
  const cartItems = useCartItems();
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      (sum += cartProducts[item.productItemId].basePrice * item.quantity),
    0
  );
  const totalDiscountedPrice = cartItems.reduce(
    (sum, item) =>
      (sum += cartProducts[item.productItemId].discountedPrice * item.quantity),
    0
  );
  return (
    <Stack gap={16}>
      <Text size="11px" c="black.7" fw={600} lts={0.5}>
        {`PRICE DETAILS (${cartItems.length} Item${
          cartItems.length > 1 ? "s" : ""
        })`}
      </Text>
      <Stack gap={8}>
        <Group justify="space-between">
          <Text c={"black.7"} size="xs">
            Total MRP
          </Text>
          <Text fw={400} size="xs">
            {formattedPrice(totalPrice)}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text c={"black.7"} size="xs">
            Discount on MRP
          </Text>
          <Text c={"green"} fw={400} size="xs">
            - {formattedPrice(totalPrice - totalDiscountedPrice)}
          </Text>
        </Group>
        {/* <Group justify="space-between" id="coupon">
          <Text c={"black.7"} size="xs">
            Coupon Discount
          </Text>
          <Text c={"green"} size="xs">
            - ₹2400.00
          </Text>
        </Group>
        <Group justify="space-between" id="donation">
          <Group gap={4}>
            <Text c={"black.7"} size="xs">
              Donation
            </Text>
            <InfoIcon info="** Donation has been added as per choice you have selected above" />
          </Group>
          <Text size="xs">₹10.00</Text>
        </Group>
        <Group justify="space-between" id="gift wrap">
          <Group gap={4}>
            <Text c={"black.7"} size="xs">
              Gift wrap charges
            </Text>
            <InfoIcon info="** Gift charges has been added as you have selected above" />
          </Group>
          <Text size="xs">₹35.00</Text>
        </Group> */}
      </Stack>
      <Divider color="gray.1" mt={4} />
      <Group justify="space-between">
        <Text fw={600} size="sm">
          Total Amount
        </Text>
        <Text fw={600} size="sm">
          {formattedPrice(totalDiscountedPrice)}
        </Text>
      </Group>
      <Button color="primaryDark.7" size="md">
        <Text tt="uppercase" size="13px" fw={600} lts={1.2}>
          place order
        </Text>
      </Button>
    </Stack>
  );
};

export default PriceDetailsBox;
