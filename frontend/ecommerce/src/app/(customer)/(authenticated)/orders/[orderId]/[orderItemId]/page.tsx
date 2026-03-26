import { PriceRow } from "@/app/(customer-checkout)/checkout/[step]/(cart)/PriceDetailsBoxHelper";
import { OrderDetailsDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { SHIPPING_CHARGE } from "@/utils/constants";
import {
  capitalizeString,
  decodeSkuToken,
  formattedPrice,
} from "@/utils/helperFunctions";
import {
  Stack,
  Divider,
  Box,
  Group,
  Title,
  Text,
  Button,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
  Accordion,
} from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconPhoneCall,
  IconUserSquare,
} from "@tabler/icons-react";
import Image from "next/image";
import DownloadInvoice from "../../../payment-success/DownloadInvoice";
import Link from "next/link";
import { ActionButton } from "@/(components)/ActionButton";

interface PageProps {
  params: {
    orderId: string;
    orderItemId: string;
  };
}

export default async function OrderDetails({ params }: PageProps) {
  const { orderId, orderItemId } = await params;
  const orderDetails = await apiFetch<OrderDetailsDTO>(
    `/order-service/order-details/${orderId}`,
  );
  const selectedOrderItemDetails = orderDetails.items.find(
    (i) => i.orderItemId === orderItemId,
  );
  const otherOrderItemDetails = orderDetails.items.filter(
    (i) => i.orderItemId !== orderItemId,
  );
  const {
    itemsTotalMrp,
    itemsTotalMrpAfterDiscount,
    couponDiscount,
    donation,
    giftWrapFee,
    shippingFee,
    totalPaidAmount,
  } = orderDetails.priceSummary;
  const variants = decodeSkuToken(selectedOrderItemDetails?.sku || "");
  return (
    <>
      <Stack
        w={{ base: "95%", md: "75%", lg: "55%" }}
        mx="auto"
        gap={32}
        my={12}
      >
        <Stack gap={12}>
          <Link href="/orders">
            <ActionButton
              Icon={<IconArrowNarrowLeft size={"16px"} />}
              label="Back to Orders"
              variant="transparent"
              style={{ marginTop: "8px", padding: 0 }}
            />
          </Link>
          <Group justify={"space-between"}>
            <Text size="xs" c="black.7">
              Order ID: {orderDetails.orderId}
            </Text>
            <Text size="xs" c="black.7" lts={0.6}>
              {orderDetails.createdAt}
            </Text>
          </Group>
          <Box
            py={12}
            px={{ base: 12, md: 20 }}
            bdrs={"8px"}
            style={{ border: `1px solid ${"var(--mantine-color-black-1)"}` }}
            bg={"white"}
          >
            <Stack>
              <Box
                display={"flex"}
                style={{
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <Link href={`/products/${selectedOrderItemDetails?.productItemId}`}>
                  <Image
                    src={selectedOrderItemDetails?.productImg || ""}
                    alt="G"
                    height={70}
                    width={70}
                    style={{ borderRadius: "6px", cursor: 'pointer' }}
                  />
                </Link>
                <Stack gap={4}>
                  <Text size="sm">{selectedOrderItemDetails?.productName}</Text>
                  <Text size="xs" c="black.8">Qty: {selectedOrderItemDetails?.quantity}</Text>
                  <Text size="xs" c="black.8">
                    {variants.join(" | ")}
                  </Text>
                </Stack>
              </Box>
              <Divider size="xs" variant="dashed" color="black.1" />
              <Group justify={"space-between"}>
                <Title order={4} c="black.8" lts={0.5}>
                  {`${capitalizeString(orderDetails.orderStatus)} On ${orderDetails.updatedAt}`}
                </Title>
                <Button color="primaryDark.7" variant="outline" size="sm">
                  <Text size="sm" fw={600}>
                    Track Order
                  </Text>
                </Button>
              </Group>
              <Divider size="xs" variant="dashed" color="black.1" />
              <Text size="sm" fw={500} lts={0.3} c="black.7">
                Other products in this shipment
              </Text>
              <Group>
                {otherOrderItemDetails.map((i) => (
                  <Link
                    href={`/orders/${orderId}/${i.orderItemId}`}
                    key={i.orderItemId}
                  >
                    <Image
                      src={i.productImg || ""}
                      alt="G"
                      height={55}
                      width={55}
                      style={{ borderRadius: "6px", cursor: "pointer" }}
                    />
                  </Link>
                ))}
              </Group>
            </Stack>
          </Box>
        </Stack>
        <Stack gap={12}>
          <Title order={4} c="black.8" lts={0.5}>
            Delivery Details
          </Title>
          <Box
            p={{ base: 12, md: 20 }}
            bdrs={"8px"}
            style={{ border: `1px solid ${"var(--mantine-color-black-1)"}` }}
            bg={"white"}
          >
            <Stack>
              <Group>
                <IconUserSquare />
                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    {orderDetails.deliveryName}
                  </Text>
                  <Text size="sm" c="black.7">
                    {orderDetails.deliveryAddressDetails}
                  </Text>
                </Stack>
              </Group>
              <Divider size="xs" variant="dashed" color="black.1" />
              <Group>
                <IconPhoneCall size={18} />
                <Text size="sm">{orderDetails.contactNumber}</Text>
              </Group>
            </Stack>
          </Box>
        </Stack>
        <Stack gap={12}>
          <Title order={4} c="black.8" lts={0.5}>
            Item Price (Per Unit)
          </Title>
          <Accordion
            defaultValue={"itemPrice"}
            chevronPosition="right"
            bdrs={"8px"}
            bd={`1px solid ${"var(--mantine-color-black-1)"}`}
            transitionDuration={1000}
            variant="default"
          >
            <AccordionItem value={"itemPrice"} bd={0}>
              <AccordionControl>
                <>
                  <Title order={4}>
                    {formattedPrice(selectedOrderItemDetails?.finalPrice || 0)}
                  </Title>
                </>
              </AccordionControl>
              <AccordionPanel
                styles={{
                  content: { padding: 0 },
                }}
              >
                <>
                  <Divider size="xs" color="black.1" />
                  <Stack px={20} py={12}>
                    <PriceRow
                      size="sm"
                      label="MRP"
                      price={formattedPrice(
                        selectedOrderItemDetails?.basePrice || 0,
                      )}
                    />
                    <PriceRow
                      size="sm"
                      label="Discounted Price"
                      price={formattedPrice(
                        selectedOrderItemDetails?.sellingPrice || 0,
                      )}
                    />
                    {selectedOrderItemDetails?.couponDiscount && (
                      <PriceRow
                        size="sm"
                        label="Coupon Discount"
                        color="green"
                        price={`-${formattedPrice(
                          selectedOrderItemDetails?.couponDiscount || 0,
                        )}`}
                      />
                    )}
                    <Divider size="xs" variant="dashed" color="black.1" />
                    <PriceRow
                      size="sm"
                      label="Total Paid"
                      labelColor="black.9"
                      color="black.9"
                      fw={500}
                      price={formattedPrice(
                        selectedOrderItemDetails?.finalPrice || 0,
                      )}
                    />
                  </Stack>
                </>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
        <Stack gap={12}>
          <Title order={4} c="black.8" lts={0.5}>
            Order Price
          </Title>
          <Accordion
            defaultValue={"orderPrice"}
            chevronPosition="right"
            bdrs={"8px"}
            bd={`1px solid ${"var(--mantine-color-black-1)"}`}
            transitionDuration={1000}
            variant="default"
          >
            <AccordionItem value={"orderPrice"} bd={0}>
              <AccordionControl>
                <>
                  <Title order={4}>
                    {formattedPrice(totalPaidAmount || 0)}
                  </Title>
                </>
              </AccordionControl>
              <AccordionPanel
                styles={{
                  content: { padding: 0 },
                }}
              >
                <Divider size="xs" color="black.1" />
                <Stack px={20} py={12}>
                  <PriceRow
                    size="sm"
                    label="Total MRP"
                    price={formattedPrice(itemsTotalMrp)}
                  />
                  <PriceRow
                    size="sm"
                    label="Discount on MRP"
                    price={`-${formattedPrice(
                      itemsTotalMrp - itemsTotalMrpAfterDiscount,
                    )}`}
                    color="green"
                  />
                  {itemsTotalMrp !== 0 && (
                    <>
                      {couponDiscount > 0 && (
                        <PriceRow
                          size="sm"
                          label="Coupon Discount"
                          price={`-${formattedPrice(couponDiscount)}`}
                          color="green"
                        />
                      )}
                      {donation > 0 && (
                        <PriceRow
                          size="sm"
                          label="Donation"
                          price={formattedPrice(donation)}
                          showInfos
                          infoText={
                            "** Donation has been added as per choice you have selected"
                          }
                        />
                      )}
                      {giftWrapFee > 0 && (
                        <PriceRow
                          size="sm"
                          label="Gift wrap charges"
                          price={formattedPrice(giftWrapFee)}
                          showInfos
                          infoText={
                            "** Gift charges has been added as you have selected"
                          }
                        />
                      )}
                      {shippingFee > 0 && (
                        <PriceRow
                          size="sm"
                          label="Shipping"
                          price={formattedPrice(shippingFee)}
                        />
                      )}
                    </>
                  )}
                  <Divider size="xs" variant="dashed" color="black.1" />
                  <PriceRow
                    size="sm"
                    label="Total Paid"
                    labelColor="black.9"
                    color="black.9"
                    fw={500}
                    price={formattedPrice(totalPaidAmount || 0)}
                  />
                  <Divider size="xs" variant="dashed" color="black.1" />
                  <PriceRow
                    size="sm"
                    label="Payment Mode"
                    price={orderDetails.paymentMode}
                  />
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
        <Box
          py={6}
          pl={{ base: 12, md: 20 }}
          bdrs={"8px"}
          style={{ border: `1px solid ${"var(--mantine-color-black-1)"}` }}
          bg={"white"}
        >
          <Group justify="space-between">
            <Text size="sm" c={"black.7"}>
              Get Invoice For This Shipment
            </Text>
            <DownloadInvoice orderId={orderId} />
          </Group>
        </Box>
      </Stack>
    </>
  );
}
