import { en } from "@/constants/en";
import { CartItemDTO, CartProducts } from "@/constants/types";
import { authClient } from "@/lib/auth-client";
import { notify, formattedPrice } from "@/utils/helperFunctions";
import { useCartActions } from "@/utils/store/cart";
import { Card, Box, Group, Stack, Text, Badge, Popover } from "@mantine/core";
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconCaretDownFilled,
  IconCheck,
  IconTrash,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { removeFromCartAction, updateCartAction } from "./cartActions";
import Image from "next/image";
import { InfoIcon } from "@/(components)/InfoIcon";
import { useState } from "react";

interface CartItemCardProps {
  cartItem: CartItemDTO;
  productItem: CartProducts;
  showLoading: () => void;
  stopLoading: () => void;
}

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
      <InfoIcon
        info={`Total price you see on ${
          en.logoText
        } is an all-inclusive price. It
                    includesthe product price, taxes and GST charges of ${
                      discountedPrice * 0.05
                    }.`}
      />
    </Group>
  );
}

function Quantity({
  quantity,
  availableStock,
  productItemId,
  showLoading,
  stopLoading,
  isLoggedIn,
  priceSnapshot,
}: {
  quantity: number;
  availableStock: number;
  productItemId: string;
  showLoading: () => void;
  stopLoading: () => void;
  isLoggedIn: boolean;
  priceSnapshot: number;
}) {
  const [opened, setOpened] = useState(false);
  const { updateCart } = useCartActions();
  const data = Array.from(
    { length: Math.min(availableStock, 25) },
    (_, i) => i + 1
  );
  const setValue = async (value: number) => {
    try {
      const payload: CartItemDTO = {
        productItemId,
        quantity: value,
        priceSnapshot,
      };
      if (!isLoggedIn) {
        notify({
          variant: "error",
          title: "Error!",
          message: "Please log in first!",
        });
        // updateCart(payload);
        return;
      } else {
        showLoading();
        await updateCartAction(payload);
      }
      updateCart(payload);
      notify({
        variant: "success",
        title: "Success!",
        message: "Cart updated successfully!",
      });
    } catch (err) {
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to update your cart!",
      });
    } finally {
      stopLoading();
      setOpened(false);
    }
  };

  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <Group
          gap={8}
          bdrs={3}
          w="max-content"
          px={8}
          py={2}
          style={{
            cursor: "pointer",
            backgroundColor: "var(--mantine-color-black-1)",
          }}
          onClick={() => setOpened((prev) => !prev)}
        >
          <Text size="xs" fw={600} visibleFrom="xs">
            {`Qty: ${quantity}`}
          </Text>
          <IconCaretDownFilled size={"12px"} />
        </Group>
      </Popover.Target>
      <Popover.Dropdown
        h={"15vw"}
        style={{ overflowY: "auto" }}
        w="max-content"
      >
        {data.map((i) => {
          return (
            <Group
              gap={8}
              py={4}
              onClick={() => setValue(i)}
              style={{ cursor: "pointer" }}
            >
              <IconCheck
                size={"18px"}
                display={i === quantity ? "inline" : "none"}
                color="var(--mantine-color-black-3)"
              />
              <Text size="xs">{i}</Text>
            </Group>
          );
        })}
      </Popover.Dropdown>
    </Popover>
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
              productItemId={productItemId}
              showLoading={showLoading}
              stopLoading={stopLoading}
              isLoggedIn={isLoggedIn}
              priceSnapshot={cartItem.priceSnapshot}
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
