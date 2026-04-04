"use client";
import { PriceSummaryRequest } from "@/constants/types";
import { notify } from "@/utils/helperFunctions";
import {
  useCartActions,
  useCartItems,
  useDonation,
  useGiftWrap,
  usePriceSummary,
  useSelectedCouponCode,
  // useTotalPrice,
} from "@/utils/store/cart";
import { Box, Stack, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import { StepType } from "@/(components)/CustomerCheckoutHeader";
import { useEffect, useState } from "react";
import { LoadingPrice } from "./LoadingCart";
import { PriceDetailsBoxHelper } from "./PriceDetailsBoxHelper";
import PriceDetailsBoxButton from "./(CartItemCard)/PriceDetailsBoxButton";
import { useCurrentUser } from "@/utils/hooks/useCurrentUser";

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
    shippingFee,
    amountToAvoidShippingFee,
    payableAmount,
  } = priceSummary;
  const { isLoggedIn } = useCurrentUser();
  const getTotalPrice = async () => {
    try {
      setIsLoading(true);
      const body: PriceSummaryRequest = {
        giftWrap,
        donation: donationAmt,
        selectedCouponCode,
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
    if (isLoggedIn)
      getTotalPrice();
  }, [cartItems, selectedCouponCode, giftWrap, donationAmt, isLoggedIn]);

  const { step } = useParams();
  return (
    <Box h={600}>
      {isLoading ? (
        <LoadingPrice step={step as StepType} />
      ) : (
        <Stack gap={16} pos={"sticky"} top={16}>
          <Text size="11px" c="black.7" fw={600} lts={0.5}>
            {`PRICE DETAILS (${selectedCartItems.length} Item${selectedCartItems.length > 1 ? "s" : ""
              })`}
          </Text>
          <PriceDetailsBoxHelper
            itemsTotalMrp={itemsTotalMrp}
            productDiscount={productDiscount}
            couponDiscount={couponDiscount}
            donation={donation}
            giftWrapFee={giftWrapFee}
            shippingFee={shippingFee}
            amountToAvoidShippingFee={amountToAvoidShippingFee}
            payableAmount={payableAmount}
            showInfos
          />
          <PriceDetailsBoxButton step={step as StepType} />
        </Stack>
      )}
    </Box>
  );
};

export default PriceDetailsBox;
