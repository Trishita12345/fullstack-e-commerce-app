import { Box, Grid, GridCol, Stack, Text } from "@mantine/core";
import PriceDetailsBox from "../(cart)/PriceDetailsBox";

import { CartProductsDTO } from "@/constants/types";
import { useViewportSize } from "@mantine/hooks";
import PaymentOptionsSection from "./PaymentOptionsSection";
import LoadingPayment from "./LoadingPayment";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsLoggedIn, useUserInfo } from "@/utils/store/auth";

const Payment = ({
  showLoading,
  stopLoading,
  cartProducts,
}: {
  showLoading: () => void;
  stopLoading: () => void;
  cartProducts: CartProductsDTO;
}) => {
  const isLoggedIn = useIsLoggedIn();
  const { width } = useViewportSize();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) router.push(`/login?redirectUrl=${encodeURIComponent(window.location.href)}`);
  }, [isLoggedIn])
  return (
    <Box w={{ base: "90%", md: "85%", lg: "70%" }} mx="auto">
      {Object.keys(cartProducts).length > 0 ? (
        <Grid>
          <GridCol
            pr={{ base: 0, lg: 24 }}
            span={{ base: 12, lg: 8 }}
            style={{
              borderRight: `${width < 1200 ? 0 : 1
                }px solid var(--mantine-color-gray-1)`,
            }}
          >
            <PaymentOptionsSection
              showLoading={showLoading}
              stopLoading={stopLoading}
            />
          </GridCol>
          <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
            <Stack my={16}>
              <PriceDetailsBox />
            </Stack>
          </GridCol>
        </Grid>
      ) : (
        <LoadingPayment />
      )}
    </Box>
  );
};

export default Payment;
