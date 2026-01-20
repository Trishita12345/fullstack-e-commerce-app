import { InfoIcon } from "@/(components)/InfoIcon";
import LoginComponent, { LoggedOutProps } from "@/(components)/LoginComponent";
import { CartProductsDTO } from "@/constants/types";
import { formattedPrice } from "@/utils/helperFunctions";
import {
  useCartItems,
  useCoupon,
  useDonation,
  useGiftWrap,
} from "@/utils/store/cart";
import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";

const PriceDetailsBox = ({
  cartProducts,
}: {
  cartProducts: CartProductsDTO;
}) => {
  const cartItems = useCartItems();
  const donation = useDonation();
  const giftWrap = useGiftWrap();
  const { couponDiscount } = useCoupon();

  const totalPrice = cartItems
    .filter((ci) => ci.isSelected)
    .reduce(
      (sum, item) =>
        (sum += cartProducts[item.productItemId].basePrice * item.quantity),
      0,
    );
  const totalDiscountedPrice = cartItems
    .filter((ci) => ci.isSelected)
    .reduce(
      (sum, item) =>
        (sum +=
          cartProducts[item.productItemId].discountedPrice * item.quantity),
      0,
    );
  const { step } = useParams();
  return (
    <Box h={600}>
      <Stack gap={16} pos={"sticky"} top={16}>
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
          {couponDiscount > 0 && (
            <Group justify="space-between" id="coupon">
              <Text c={"black.7"} size="xs">
                Coupon Discount
              </Text>
              <Text c={"green"} size="xs">
                - {formattedPrice(couponDiscount)}
              </Text>
            </Group>
          )}
          {donation > 0 && (
            <Group justify="space-between" id="donation">
              <Group gap={4}>
                <Text c={"black.7"} size="xs">
                  Donation
                </Text>
                <InfoIcon info="** Donation has been added as per choice you have selected above" />
              </Group>
              <Text size="xs">{formattedPrice(donation)}</Text>
            </Group>
          )}
          {giftWrap > 0 && (
            <Group justify="space-between" id="gift wrap">
              <Group gap={4}>
                <Text c={"black.7"} size="xs">
                  Gift wrap charges
                </Text>
                <InfoIcon info="** Gift charges has been added as you have selected above" />
              </Group>
              <Text size="xs">{formattedPrice(giftWrap)}</Text>
            </Group>
          )}
        </Stack>
        <Divider color="gray.1" mt={4} />
        <Group justify="space-between">
          <Text fw={600} size="sm">
            Total Amount
          </Text>
          <Text fw={600} size="sm">
            {formattedPrice(
              totalDiscountedPrice - couponDiscount + donation + giftWrap,
            )}
          </Text>
        </Group>
        <LoginComponent
          LoggedInComponent={() => (
            <>
              {step !== "payment" && (
                <Link href={`${step == "cart" ? "./address" : "./payment"}`}>
                  <Button color="primaryDark.7" size="md" fullWidth>
                    <Text tt="uppercase" size="13px" fw={600} lts={1.2}>
                      place order
                    </Text>
                  </Button>
                </Link>
              )}
            </>
          )}
          NotLoggedInComponent={({ openLoginPopUp }: LoggedOutProps) => (
            <Button
              color="primaryDark.7"
              size="md"
              fullWidth
              onClick={openLoginPopUp}
            >
              <Text tt="uppercase" size="13px" fw={600} lts={1.2}>
                Login to Proceed
              </Text>
            </Button>
          )}
        />
      </Stack>
    </Box>
  );
};

export default PriceDetailsBox;
