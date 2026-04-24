import { StepType } from "@/(components)/CustomerCheckoutHeader";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  GridCol,
  Group,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
  IconGiftFilled,
  IconTag,
  IconTrash,
  IconTruckDelivery,
} from "@tabler/icons-react";

export const LoadingPrice = ({ step }: { step: StepType }) => (
  <Stack gap={16}>
    <Text size="11px" c="black.7" fw={600} lts={0.5}>
      PRICE DETAILS
    </Text>
    <Stack gap={8}>
      <Group justify="space-between">
        <Text c={"black.7"} size="xs">
          Total MRP
        </Text>
        <Skeleton height={10} width={30} />
      </Group>
      <Group justify="space-between">
        <Text c={"black.7"} size="xs">
          Discount on MRP
        </Text>
        <Skeleton height={10} width={30} />
      </Group>
    </Stack>
    <Divider color="gray.1" mt={4} />
    <Group justify="space-between">
      <Text fw={600} size="sm">
        Total Amount
      </Text>
      <Skeleton height={10} width={30} />
    </Group>
    {step !== "payment" && (
      <Button color="primaryDark.7" size="md">
        <Skeleton height={10} width={50} />
      </Button>
    )}
  </Stack>
);
const LoadingCart = () => {
  const { width } = useViewportSize();
  const LoadingCartItem = () => (
    <Card
      withBorder
      shadow="sm"
      radius="sm"
      p={10}
      styles={{
        root: { border: "1px solid var(--mantine-color-black-1)" },
      }}
    >
      <Box
        display={"flex"}
        style={{
          gap: "16px",
          alignItems: "start",
        }}
      >
        <Skeleton height={140} width={105} />
        <Group justify="space-between" w="100%" align="start">
          <Stack flex={11} gap={16}>
            <Skeleton height={18} width={300} />

            <Skeleton height={18} width={180} />
            <Skeleton height={18} width={80} />
            <Skeleton height={18} width={80} />
          </Stack>
          <Skeleton height={20} width={20} />
        </Group>
      </Box>
    </Card>
  );

  const LoadingGiftBox = () => {
    return (
      <Stack gap={16}>
        <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
          GIFTING & PERSONALISATION
        </Text>
        <Card bg={"primary.0"}>
          <Group align="center">
            <IconGiftFilled color="#FF3F6E" />
            <Stack gap={8} w={"70%"}>
              <Text size="xs" fw={700} c="black.8">
                Buying for a Loved One?
              </Text>
              <Text size="xs" c="black.7">
                Gift Packaging and personalised message on card, Only for ₹35
              </Text>
              <Text
                size="xs"
                fw={600}
                c="primaryDark.7"
                tt={"uppercase"}
                style={{ cursor: "pointer" }}
              >
                Add Gift Package
              </Text>
            </Stack>
          </Group>
        </Card>
        <Divider color="gray.1" mt={4} />
      </Stack>
    );
  };
  const LoadingDonation = () => {
    return (
      <Stack gap={16}>
        <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
          Support transformative social work in India
        </Text>
        <Group gap={8}>
          <Skeleton height={10} width={10} />
          <Skeleton height={10} width={250} />
        </Group>
        <Group gap={8}>
          {[1, 2, 3, 4, 5].map((donation) => (
            <Skeleton height={10} width={50} key={donation} />
          ))}
        </Group>
        <Text
          size="xs"
          fw={600}
          c={"primaryDark.7"}
          style={{ cursor: "pointer" }}
        >
          Know More
        </Text>
        <Divider color="gray.1" mt={4} />
      </Stack>
    );
  };
  const LoadingCoupon = () => {
    return (
      <Stack gap={16}>
        <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
          COUPONS
        </Text>
        <Group justify="space-between">
          <Group gap={8}>
            <IconTag size={18} />
            <Text size="13px" fw={600}>
              Apply Coupons
            </Text>
          </Group>
          <Button
            variant="outline"
            color={"primaryDark.7"}
            size="xs"
            onClick={() => {}}
          >
            <Text size="xs" lts={0.8} fw={600}>
              APPLY
            </Text>
          </Button>
        </Group>
        <Divider color="gray.1" mt={4} />
      </Stack>
    );
  };
  return (
    <Box pos="relative">
      <Grid>
        <GridCol
          pr={{ base: 0, lg: 24 }}
          span={{ base: 12, lg: 8 }}
          style={{
            borderRight: `${
              width < 1200 ? 0 : 1
            }px solid var(--mantine-color-gray-1)`,
          }}
        >
          <Stack my={24}>
            <Group
              bd={"1px solid gray.1"}
              p={16}
              bdrs={4}
              bg={"primary.0"}
              justify="space-between"
            >
              <Stack gap={4}>
                <Skeleton height={18} width={180} />
                <Skeleton height={18} width={300} />
              </Stack>
              <Skeleton height={40} width={120} />
            </Group>
            <Skeleton height={18} width={300} pt={24} pb={12} />
            {[1, 2].map((i) => (
              <LoadingCartItem key={i} />
            ))}
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
          <Stack my={24} gap={18}>
            <LoadingCoupon />
            <LoadingGiftBox />
            <LoadingDonation />
            <LoadingPrice step={"cart"} />
          </Stack>
        </GridCol>
      </Grid>
    </Box>
  );
};

export default LoadingCart;
