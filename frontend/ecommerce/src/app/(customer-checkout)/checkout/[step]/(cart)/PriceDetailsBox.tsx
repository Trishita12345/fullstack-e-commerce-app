import { InfoIcon } from "@/(components)/InfoIcon";
import LoginComponent, { LoggedOutProps } from "@/(components)/LoginComponent";
import {
  CartProductsDTO,
  PriceSummaryRequest,
  PriceSummaryResponse,
  TotalPriceFromProductDTORequest,
} from "@/constants/types";
import {
  GIFT_WRAP_CHARGE,
  MIN_PURCHASE_VALUE,
  SHIPPING_CHARGE,
} from "@/utils/constants";
import { formattedPrice, notify } from "@/utils/helperFunctions";
import {
  useCartActions,
  useCartItems,
  useDonation,
  useGiftWrap,
  usePriceSummary,
  useSelectedCouponCode,
  useSelectedCouponDetails,
  // useTotalPrice,
} from "@/utils/store/cart";
import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import PriceDetailsBoxButton from "./(CartItemCard)/PriceDetailsBoxButton";
import { StepType } from "@/(components)/CustomerCheckoutHeader";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiFetch";
import { LoadingPrice } from "./LoadingCart";

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

const PriceDetailsBox = () => {
  const cartItems = useCartItems();
  const selectedCartItems = cartItems.filter((c) => c.isSelected);
  const donationAmt = useDonation();
  const giftWrap = useGiftWrap();
  const selectedCouponCode = useSelectedCouponCode();
  const { setPriceSummary } = useCartActions();
  const priceSummary = usePriceSummary();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    itemsTotalMrp,
    productDiscount,
    couponDiscount,
    donation,
    giftWrapFee,
    roundingAdjustment,
    shippingFee,
    amountToAvoidShippingFee,
    payableAmount,
  } = priceSummary;

  const getTotalPrice = async () => {
    try {
      setIsLoading(true);
      const body: PriceSummaryRequest = {
        placeOrderReqDTO: {
          giftWrap,
          donation: donationAmt,
          selectedCouponCode,
        },
        cartItems: selectedCartItems.map((i) => ({
          productItemId: i.productItemId,
          quantity: i.updatedQuantity,
        })),
      };
      await setPriceSummary(body);
    } catch {
      notify({
        variant: "error",
        title: "Error",
        message: "Failed to fetch prices!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTotalPrice();
  }, [cartItems, selectedCouponCode, giftWrap, donationAmt]);

  const { step } = useParams();
  return (
    <Box h={600}>
      {isLoading ? (
        <LoadingPrice step={step as StepType} />
      ) : (
        <Stack gap={16} pos={"sticky"} top={16}>
          <Text size="11px" c="black.7" fw={600} lts={0.5}>
            {`PRICE DETAILS (${selectedCartItems.length} Item${
              selectedCartItems.length > 1 ? "s" : ""
            })`}
          </Text>
          <Stack gap={8}>
            <PriceRow label="Total MRP" price={formattedPrice(itemsTotalMrp)} />
            <PriceRow
              label="Discount on MRP"
              price={`-${formattedPrice(productDiscount)}`}
              color="green"
            />
            {itemsTotalMrp !== 0 && (
              <>
                {couponDiscount > 0 && (
                  <PriceRow
                    label="Coupon Discount"
                    price={`-${formattedPrice(couponDiscount)}`}
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
                {giftWrapFee > 0 && (
                  <PriceRow
                    label="Gift wrap charges"
                    price={formattedPrice(giftWrapFee)}
                    infoText={
                      "** Gift charges has been added as you have selected above"
                    }
                  />
                )}
                {roundingAdjustment > 0 && (
                  <PriceRow
                    label="Rounding Adjustment"
                    price={formattedPrice(roundingAdjustment)}
                  />
                )}
                {shippingFee > 0 && (
                  <PriceRow
                    label="Shipping"
                    price={formattedPrice(SHIPPING_CHARGE)}
                    infoText={`Shop more of ${formattedPrice(amountToAvoidShippingFee)} to avoid shipping charges`}
                  />
                )}
              </>
            )}
          </Stack>
          <Divider color="gray.1" mt={4} />
          <Group justify="space-between">
            <Text fw={600} size="sm">
              Total Amount
            </Text>
            <Text fw={600} size="sm">
              {payableAmount}
            </Text>
          </Group>
          <PriceDetailsBoxButton step={step as StepType} />
        </Stack>
      )}
    </Box>
  );
};

export default PriceDetailsBox;
