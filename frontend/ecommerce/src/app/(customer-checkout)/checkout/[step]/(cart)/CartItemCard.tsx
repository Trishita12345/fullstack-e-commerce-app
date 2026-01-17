import { en } from "@/constants/en";
import { CartItemDTO, CartProducts } from "@/constants/types";
import { authClient } from "@/lib/auth-client";
import { notify, formattedPrice } from "@/utils/helperFunctions";
import { useCartActions } from "@/utils/store/cart";
import { Card, Box, Group, Stack, Tooltip, Text, Badge } from "@mantine/core";
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconInfoCircle,
  IconTrash,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { removeFromCartAction } from "./cartActions";
import Image from "next/image";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { useCounter } from "@mantine/hooks";

interface CartItemCardProps {
  cartItem: CartItemDTO;
  productItem: CartProducts;
  showLoading: () => void;
  stopLoading: () => void;
}

const InfoIcon = ({ discountedPrice }: { discountedPrice: number }) => {
  return (
    <Tooltip
      withArrow
      arrowSize={6}
      w={200}
      label={
        <Text size="10px" style={{ whiteSpace: "wrap" }} lh={1.5}>
          {`Total price you see on ${en.logoText} is an all-inclusive price. It
                    includesthe product price, taxes and GT charges of ${
                      discountedPrice * 0.05
                    }.`}
        </Text>
      }
    >
      <IconInfoCircle
        color="var(--mantine-color-dimmed)"
        size={12}
        style={{ cursor: "pointer" }}
      />
    </Tooltip>
  );
};

function Price({
  basePrice,
  discountedPrice,
  priceSnapshot,
}: {
  basePrice: number;
  discountedPrice: number;
  priceSnapshot: number;
}) {
  return (
    <Group key={basePrice} gap={4} id="price">
      <Text size="sm" fw={500}>
        {formattedPrice(discountedPrice)}
      </Text>
      {discountedPrice !== basePrice && (
        <>
          <Text size="sm" td={"line-through"} c="dimmed">
            {formattedPrice(basePrice)}
          </Text>
          <Text size="sm" c="red">
            {formattedPrice(basePrice - discountedPrice)} OFF
          </Text>
        </>
      )}
      {discountedPrice !== priceSnapshot && (
        <>
          {priceSnapshot < discountedPrice ? (
            <Badge variant="outline" color="red">
              <Group gap={4}>
                <IconArrowNarrowUp size={"14px"} />
                <Text
                  size="xs"
                  tt={"capitalize"}
                >{`Price Increased by ${formattedPrice(
                  discountedPrice - priceSnapshot
                )}`}</Text>
              </Group>
            </Badge>
          ) : (
            <Badge variant="outline" color="green">
              <Group gap={4}>
                <IconArrowNarrowDown size={"14px"} />
                <Text
                  size="xs"
                  tt={"capitalize"}
                >{`Price Decreased by ${formattedPrice(
                  priceSnapshot - discountedPrice
                )}`}</Text>
              </Group>
            </Badge>
          )}
        </>
      )}
      <InfoIcon discountedPrice={discountedPrice} />
    </Group>
  );
}

function Quantity({
  quantity,
  availableStock,
}: {
  quantity: number;
  availableStock: number;
}) {
  const [value, { increment, decrement }] = useCounter(quantity, {
    min: 1,
    max: availableStock,
  });

  return (
    <Button.Group>
      <Button variant="default" radius="md" onClick={decrement}>
        <IconChevronDown color="var(--mantine-color-red-text)" />
      </Button>
      <Button.GroupSection
        variant="default"
        bg="var(--mantine-color-body)"
        miw={80}
      >
        {value}
      </Button.GroupSection>
      <Button variant="default" radius="md" onClick={increment}>
        <IconChevronUp color="var(--mantine-color-teal-text)" />
      </Button>
    </Button.Group>
  );
}

const CartItemCard = ({
  cartItem,
  productItem,
  showLoading,
  stopLoading,
}: CartItemCardProps) => {
  const { data: session } = authClient.useSession();
  const isLoggedIn = Boolean(session?.user?.id);
  const { removeFromCart } = useCartActions();
  const {
    productName,
    productItemId,
    basePrice,
    discountedPrice,
    availableStock,
    imgUrl,
  } = productItem;
  const handleRemoveFromCart = async (productItemId: string) => {
    try {
      showLoading();
      if (isLoggedIn) {
        removeFromCartAction(productItemId);
      }
      removeFromCart(productItemId);
      notify({
        variant: "success",
        title: "Success!",
        message: "Item removed from cart successfully!",
      });
    } catch {
    } finally {
      stopLoading();
    }
  };

  return (
    <Card
      withBorder
      shadow="sm"
      radius="sm"
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
        <Image src={imgUrl} height={120} width={90} alt={productName} />
        <Group justify="space-between" w="100%" align="start">
          <Stack flex={11} gap={8}>
            <Text size="sm" c="black.6">
              {productName}
            </Text>
            <Price
              basePrice={basePrice}
              discountedPrice={discountedPrice}
              priceSnapshot={cartItem.priceSnapshot}
            />
            <Quantity
              availableStock={availableStock}
              quantity={cartItem.quantity}
            />
            <Group gap={4} id="ship">
              <IconTruckDelivery
                color="var(--mantine-color-primaryDark-5)"
                size={18}
              />
              <Text size="xs" c="black.6" lts={0.4}>
                Ship within 1-2 days
              </Text>
            </Group>
          </Stack>
          <IconTrash
            color="var(--mantine-color-primaryDark-5)"
            size={18}
            style={{ cursor: "pointer" }}
            onClick={() => handleRemoveFromCart(productItemId)}
          />
        </Group>
      </Box>
    </Card>
  );
};

export default CartItemCard;
