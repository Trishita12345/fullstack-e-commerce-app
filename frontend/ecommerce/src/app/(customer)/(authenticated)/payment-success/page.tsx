import { PriceDetailsBoxHelper } from "@/app/(customer-checkout)/checkout/[step]/(cart)/PriceDetailsBoxHelper";
import { OrderDetailsDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { formattedPrice } from "@/utils/helperFunctions";
import {
  Box,
  Button,
  Divider,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowNarrowRight,
  IconMail,
  IconPhone,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import DownloadInvoice from "./DownloadInvoice";
import { en } from "@/constants/en";

interface PageProps {
  searchParams: {
    orderId: string;
  };
}

async function PaymentSuccess({ searchParams }: PageProps) {
  const { orderId } = await searchParams;
  const orderDetails = await apiFetch<OrderDetailsDTO>(
    `/order-service/order-details/${orderId}`,
  );

  console.log("orderDetails: ", orderDetails);
  return (
    <Box bg="#FCFAF6">
      <Box w={{ base: "95%", md: "90%", lg: "80%" }} mx="auto" py={48}>
        <Stack align="center" gap={12} mb={24}>
          <IconRosetteDiscountCheckFilled
            color="var(--mantine-color-primaryDark-7)"
            height={80}
            width={80}
          />
          <Stack gap={10} align="center">
            <Title order={2}>Your order is confirmed!</Title>
            <Link href="/">
              <Button
                variant="light"
                color="primaryDark.7"
                rightSection={<IconArrowNarrowRight />}
              >
                Continue Shopping
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Box bg={"primaryDark.7"} bdrs={"12px"} pt={12}>
          <Group justify="space-between" px={28} py={20}>
            <Stack gap={8}>
              <Title order={4} c="white">
                Order ID: #{orderId.replace("-", "")}
              </Title>
              <Text size="sm" c="white">
                Order Date: {orderDetails.createdAt}
              </Text>
            </Stack>
            <DownloadInvoice orderId={orderId} />
            {/* <Button
                color="#FFEB5C"
                c="primaryDark.9"
                leftSection={<IconCurrentLocationFilled />}
              >
                Track Order
              </Button> */}
          </Group>
          <Box
            py={20}
            px={28}
            bdrs={"12px"}
            bd={"1px solid lightgrey"}
            bg={"white"}
          >
            <Stack>
              {orderDetails.items.map((i) => (
                <Group justify="space-between">
                  <Group>
                    <Image
                      src={i.productImg}
                      alt="G"
                      height={60}
                      width={60}
                      style={{ borderRadius: "6px" }}
                    />
                    <Text>{i.productName}</Text>
                  </Group>
                  <Stack gap={4}>
                    <Group gap={4}>
                      {/* <Text size="sm" c="dimmed" td="line-through">
                        {formattedPrice(i.basePrice)}
                      </Text> */}
                      <Text fw={500}>{formattedPrice(i.finalPrice)}</Text>
                    </Group>
                    <Text c="grey" size="sm" ta="end">
                      Qty:{" "}
                      <span style={{ fontWeight: 500, color: "#000000" }}>
                        {i.quantity}
                      </span>
                    </Text>
                  </Stack>
                </Group>
              ))}
              <Divider color="gray.1" />
              <Grid>
                <GridCol span={{ base: 12, sm: 3 }}>
                  <Stack gap={4}>
                    <Text size="sm" fw={500}>
                      Payment Method
                    </Text>
                    <Text c="dimmed" size="sm">
                      {orderDetails.paymentMode}
                    </Text>
                  </Stack>
                </GridCol>
                <GridCol span={{ base: 12, sm: 6 }}>
                  <Stack gap={4}>
                    <Text size="sm" fw={500}>
                      Delivery Address
                    </Text>
                    <Text c="dimmed" size="sm">
                      {orderDetails.deliveryName}
                    </Text>
                    <Text c="dimmed" size="sm">
                      {orderDetails.deliveryAddressDetails}
                    </Text>
                    <Text c="dimmed" size="sm">
                      {orderDetails.contactNumber}
                    </Text>
                  </Stack>
                </GridCol>
                <GridCol span={{ base: 12, sm: 3 }}>
                  <Stack gap={4} flex={{ base: 12, sm: 1 }}>
                    <Text size="sm" fw={500}>
                      Delivery Mode
                    </Text>
                    <Text c="dimmed" size="sm">
                      Express shipping(1-2 days)
                    </Text>
                  </Stack>
                </GridCol>
              </Grid>
              <Divider color="gray.1" />
              <Grid>
                <GridCol span={{ base: 12, xs: 6, md: 8 }}>
                  <Stack gap={4}>
                    <Text size="sm" fw={500}>
                      Need Help?
                    </Text>
                    <Group gap={6} align="center">
                      <Text c="dimmed">
                        <IconMail size={"16px"} style={{ marginTop: "8px" }} />
                      </Text>
                      <Text c="dimmed" size="sm">
                        {en.companyEmail}
                      </Text>
                    </Group>
                    <Group gap={6}>
                      <Text c="dimmed">
                        <IconPhone size={"18px"} style={{ marginTop: "6px" }} />
                      </Text>
                      <Text c="dimmed" size="sm">
                        {en.companyPhone}
                      </Text>
                    </Group>
                  </Stack>
                </GridCol>
                <GridCol span={{ base: 12, xs: 6, md: 4 }}>
                  <PriceDetailsBoxHelper
                    itemsTotalMrp={orderDetails.priceSummary.itemsTotalMrp}
                    productDiscount={
                      orderDetails.priceSummary.itemsTotalMrp -
                      orderDetails.priceSummary.itemsTotalMrpAfterDiscount
                    }
                    couponDiscount={orderDetails.priceSummary.couponDiscount}
                    donation={orderDetails.priceSummary.donation}
                    giftWrapFee={orderDetails.priceSummary.giftWrapFee}
                    shippingFee={orderDetails.priceSummary.shippingFee}
                    payableAmount={orderDetails.priceSummary.totalPaidAmount}
                  />
                </GridCol>
              </Grid>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PaymentSuccess;
