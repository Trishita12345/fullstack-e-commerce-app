import { en } from "@/constants/en";
import { Box, Divider, Group, Stack, Text, Title } from "@mantine/core";
import {
  IconPackage,
  IconPhoneIncoming,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { Fragment } from "react";

type FastShippingDataProps = {
  Icon: any;
  title: string;
  subtitle: string;
};
const fastShippingData: FastShippingDataProps[] = [
  {
    Icon: IconPackage,
    title: en.freeEasyReturns,
    subtitle: en.returnIn6Days,
  },
  {
    Icon: IconTruckDelivery,
    title: en.fastDelivery,
    subtitle: en.getProductUnder24hrs,
  },
  {
    Icon: IconPhoneIncoming,
    title: en.allDaySupport,
    subtitle: en.supportCare,
  },
  {
    Icon: IconShieldCheck,
    title: en.securePayments,
    subtitle: en.razorPayProtect,
  },
];
export const FastShipping = () => {
  return (
    <Box bg="gray.0" py={96} px={24}>
      <Stack w={"100%"} justify="center" gap={16}>
        <Text
          style={{ fontFamily: "var(--font-allura)" }}
          size={"2rem"}
          c={"primaryDark.6"}
          ta={"center"}
        >
          {en.fastShipping}
        </Text>
        <Title
          ta={"center"}
          order={1}
          style={{ fontFamily: "var(--font-jost)" }}
        >
          {en.freeAndFastShipping}
        </Title>
      </Stack>
      <Group justify="center" pt={96} gap={48}>
        {fastShippingData.map((item: FastShippingDataProps, idx: number) => (
          <Fragment key={item.title}>
            <Stack align="center" gap={4}>
              <item.Icon
                size={"2.8rem"}
                color="var(--mantine-color-primaryDark-light-color)"
              />
              <Title pt={12} order={6}>
                {item.title}
              </Title>
              <Text style={{ fontSize: "10px" }} c={"black.7"}>
                {item.subtitle}
              </Text>
            </Stack>
            {idx < fastShippingData.length - 1 && (
              <Divider orientation="vertical" color="black.1" />
            )}
          </Fragment>
        ))}
      </Group>
    </Box>
  );
};
