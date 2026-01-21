import { InfoIcon } from "@/(components)/InfoIcon";
import LoginComponent, { LoggedOutProps } from "@/(components)/LoginComponent";
import { CartProductsDTO } from "@/constants/types";
import { MIN_PURCHASE_VALUE, SHIPPING_CHARGE } from "@/utils/constants";
import { formattedPrice } from "@/utils/helperFunctions";
import {
  useCartItems,
  useDonation,
  useGiftWrap,
  useSelectedCouponDetails,
} from "@/utils/store/cart";
import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";

const PriceRow = ({
  label,
  price,
  infoText,
  color,
}: {
  label: string;
  price: string;
  infoText?: string;
  color?: string;
}) => (
  <Group justify="space-between" id="gift wrap">
    <Group gap={4}>
      <Text c={"black.7"} size="xs">
        {label}
      </Text>
      {infoText && <InfoIcon info={infoText} />}
    </Group>
    <Text size="xs" c={color || "black.7"}>
      {price}
    </Text>
  </Group>
);

const PriceDetailsBox = ({
  cartProducts,
}: {
  cartProducts: CartProductsDTO;
}) => {
  const cartItems = useCartItems();
  const donation = useDonation();
  const giftWrap = useGiftWrap();
  const selectedCouponDetails = useSelectedCouponDetails();

  const totalPrice = cartItems
    .filter((ci) => ci.isSelected)
    .reduce(
      (sum, item) =>
        (sum +=
          cartProducts[item.productItemId].basePrice * item.updatedQuantity),
      0,
    );
  const totalDiscountedPrice = cartItems
    .filter((ci) => ci.isSelected)
    .reduce(
      (sum, item) =>
        (sum +=
          cartProducts[item.productItemId].discountedPrice *
          item.updatedQuantity),
      0,
    );
  const totalDiscountedPriceAfterCoupon =
    totalDiscountedPrice - (selectedCouponDetails?.discountPercent || 0);
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
          <PriceRow label="Total MRP" price={formattedPrice(totalPrice)} />
          <PriceRow
            label="Discount on MRP"
            price={`-${formattedPrice(totalPrice - totalDiscountedPrice)}`}
            color="green"
          />
          {selectedCouponDetails && (
            <PriceRow
              label="Coupon Discount"
              price={`-${
                totalDiscountedPrice *
                (selectedCouponDetails.discountPercent / 100)
              }`}
              color="green"
            />
          )}
          {donation > 0 && (
            <PriceRow
              label="Donation"
              price={formattedPrice(donation)}
              infoText={
                "** Donation has been added as per choice you have selected above"
              }
            />
          )}
          {giftWrap > 0 && (
            <PriceRow
              label="Gift wrap charges"
              price={formattedPrice(giftWrap)}
              infoText={
                "** Gift charges has been added as you have selected above"
              }
            />
          )}
          {totalDiscountedPriceAfterCoupon < MIN_PURCHASE_VALUE && (
            <PriceRow
              label="Shipping"
              price={formattedPrice(SHIPPING_CHARGE)}
              infoText={`Shop more ${formattedPrice(MIN_PURCHASE_VALUE - totalDiscountedPriceAfterCoupon)} to avoid shipping charges`}
            />
          )}
        </Stack>
        <Divider color="gray.1" mt={4} />
        <Group justify="space-between">
          <Text fw={600} size="sm">
            Total Amount
          </Text>
          <Text fw={600} size="sm">
            {formattedPrice(
              totalDiscountedPriceAfterCoupon +
                donation +
                giftWrap +
                (totalDiscountedPriceAfterCoupon < MIN_PURCHASE_VALUE
                  ? SHIPPING_CHARGE
                  : 0),
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
