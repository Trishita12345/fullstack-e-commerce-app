import { InfoIcon } from "@/(components)/InfoIcon";
import LoginComponent, { LoggedOutProps } from "@/(components)/LoginComponent";
import {
  CartProductsDTO,
  TotalPriceFromProductDTORequest,
} from "@/constants/types";
import { MIN_PURCHASE_VALUE, SHIPPING_CHARGE } from "@/utils/constants";
import { formattedPrice } from "@/utils/helperFunctions";
import {
  useCartActions,
  useCartItems,
  useDonation,
  useGiftWrap,
  useSelectedCouponDetails,
  useTotalBasePrice,
  useTotalDiscountedPrice,
  // useTotalPrice,
} from "@/utils/store/cart";
import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import PriceDetailsBoxButton from "./(CartItemCard)/PriceDetailsBoxButton";
import { StepType } from "@/(components)/CustomerCheckoutHeader";
import { useEffect } from "react";

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
  const selectedCartItems = cartItems.filter((c) => c.isSelected);
  const donation = useDonation();
  const giftWrap = useGiftWrap();
  const selectedCouponDetails = useSelectedCouponDetails();
  const totalBasePrice = useTotalBasePrice();
  const totalDiscountedPrice = useTotalDiscountedPrice();
  const { setTotalPrice } = useCartActions();

  const getTotalPrice = async () => {
    const body: TotalPriceFromProductDTORequest[] = selectedCartItems.map(
      (i) => ({ productItemId: i.productItemId, quantity: i.quantity }),
    );
    await setTotalPrice(body);
  };

  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);

  const totalDiscountedPriceAfterCoupon =
    totalDiscountedPrice - (selectedCouponDetails?.discountPercent || 0);
  const { step } = useParams();
  return (
    <Box h={600}>
      <Stack gap={16} pos={"sticky"} top={16}>
        <Text size="11px" c="black.7" fw={600} lts={0.5}>
          {`PRICE DETAILS (${selectedCartItems.length} Item${
            selectedCartItems.length > 1 ? "s" : ""
          })`}
        </Text>
        <Stack gap={8}>
          <PriceRow label="Total MRP" price={formattedPrice(totalBasePrice)} />
          <PriceRow
            label="Discount on MRP"
            price={`-${formattedPrice(totalBasePrice - totalDiscountedPrice)}`}
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
        <PriceDetailsBoxButton step={step as StepType} />
      </Stack>
    </Box>
  );
};

export default PriceDetailsBox;
