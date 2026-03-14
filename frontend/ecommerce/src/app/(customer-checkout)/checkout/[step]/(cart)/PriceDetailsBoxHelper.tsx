import { InfoIcon } from "@/(components)/InfoIcon";
import { SHIPPING_CHARGE } from "@/utils/constants";
import { formattedPrice } from "@/utils/helperFunctions";
import { Group, Stack, Divider, Text } from "@mantine/core";

export const PriceRow = ({
  label,
  price,
  infoText,
  color,
  labelColor,
  showInfos = false,
  size = "xs",
  fw = 400,
}: {
  label: string;
  price: string;
  infoText?: string;
  color?: string;
  showInfos?: boolean;
  size?: string;
  labelColor?: string;
  fw?: 400 | 500 | 600;
}) => (
  <Group justify="space-between" id="gift wrap">
    <Group gap={4}>
      <Text c={labelColor || "black.7"} size={size} fw={fw}>
        {label}
      </Text>
      {infoText && showInfos && <InfoIcon info={infoText} />}
    </Group>
    <Text size={size} c={color || "black.7"} fw={fw}>
      {price}
    </Text>
  </Group>
);
export const PriceDetailsBoxHelper = ({
  itemsTotalMrp,
  productDiscount,
  couponDiscount,
  donation,
  giftWrapFee,
  shippingFee,
  amountToAvoidShippingFee,
  payableAmount,
  showInfos = false,
}: {
  itemsTotalMrp: number;
  productDiscount: number;
  couponDiscount: number;
  donation: number;
  giftWrapFee: number;
  shippingFee: number;
  amountToAvoidShippingFee?: number;
  payableAmount: number;
  showInfos?: boolean;
}) => {
  return (
    <>
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
                showInfos={showInfos}
                infoText={
                  "** Donation has been added as per choice you have selected above"
                }
              />
            )}
            {giftWrapFee > 0 && (
              <PriceRow
                label="Gift wrap charges"
                price={formattedPrice(giftWrapFee)}
                showInfos={showInfos}
                infoText={
                  "** Gift charges has been added as you have selected above"
                }
              />
            )}
            {shippingFee > 0 && (
              <PriceRow
                label="Shipping"
                price={formattedPrice(SHIPPING_CHARGE)}
                showInfos={showInfos}
                infoText={
                  amountToAvoidShippingFee
                    ? `Shop more of ${formattedPrice(amountToAvoidShippingFee)} to avoid shipping charges`
                    : undefined
                }
              />
            )}
          </>
        )}
      </Stack>
      <Divider color="gray.1" my={8} />
      <Group justify="space-between">
        <Text fw={600} size="sm">
          Total Amount
        </Text>
        <Text fw={600} size="sm">
          {formattedPrice(payableAmount)}
        </Text>
      </Group>
    </>
  );
};
