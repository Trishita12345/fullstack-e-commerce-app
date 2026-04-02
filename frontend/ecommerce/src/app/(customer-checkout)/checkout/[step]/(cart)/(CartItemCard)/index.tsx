import { CartItemDTO, CartProducts } from "@/constants/types";
import {
  notify,
  decodeSkuToken,
} from "@/utils/helperFunctions";
import { useCartActions } from "@/utils/store/cart";
import {
  Card,
  Box,
  Group,
  Stack,
  Text,
  Checkbox,
} from "@mantine/core";
import {
  IconTruckDelivery,
} from "@tabler/icons-react";
import { updateCartAction } from "../../../cartActions";
import Image from "next/image";
import Link from "next/link";
import DeleteCartItem from "../DeleteCartItem";

import Price from "./PriceSection";
import Quantity from "./Quantity";
import { useCurrentUser } from "@/utils/hooks/useCurrentUser";

interface CartItemCardProps {
  cartItem: CartItemDTO;
  productItem: CartProducts;
  showLoading: () => void;
  stopLoading: () => void;
}

const CartItemCard = ({
  cartItem,
  productItem,
  showLoading,
  stopLoading,
}: CartItemCardProps) => {
  const { isLoggedIn } = useCurrentUser();
  const { updateCartSelected } = useCartActions();
  const {
    sku,
    productName = "",
    productItemId = "",
    basePrice = 0,
    discountedPrice = 0,
    availableStock = 0,
    imgUrl,
  } = productItem;
  const handleCheck = async (e: React.MouseEvent<HTMLInputElement>) => {
    const isSelected = e.currentTarget.checked;
    try {
      const payload: CartItemDTO = {
        ...cartItem,
        isSelected,
      };
      if (isLoggedIn) {
        showLoading();
        await updateCartAction(payload);
      }
      updateCartSelected(payload);
    } catch (err) {
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to update your cart!",
      });
    } finally {
      stopLoading();
    }
  };
  const variants = decodeSkuToken(sku);
  return (
    <Card
      withBorder
      shadow="sm"
      radius="sm"
      p={10}
      styles={{
        root: {
          border: `1px solid ${cartItem.updatedQuantity === 0 ? "red" : "var(--mantine-color-black-1)"}`,
        },
      }}
    >
      <Box
        display={"flex"}
        style={{
          gap: "16px",
          alignItems: "start",
        }}
      >
        <Box pos="relative">
          <Checkbox
            disabled={cartItem.updatedQuantity === 0}
            checked={cartItem.isSelected}
            color={"primaryDark.7"}
            style={{
              position: "absolute",
              top: 4,
              left: 4,
            }}
            onClick={handleCheck}
          />
          <Link href={`/products/${productItemId}`}>
            <Image
              src={imgUrl}
              height={140}
              width={105}
              alt={productName}
              style={{
                filter:
                  cartItem.updatedQuantity === 0 ? "grayscale(1)" : "none",
              }}
            />
          </Link>
        </Box>
        <Group justify="space-between" w="100%" align="start">
          <Stack flex={11} gap={8}>
            <Link href={`/products/${productItemId}`}>
              <Text size="xs" c="black.8" tt="capitalize" fw={500}>
                {[productName, ...variants].join(" | ")}
              </Text>
            </Link>
            <Quantity
              availableStock={availableStock}
              quantity={cartItem.quantity}
              updatedQuantity={cartItem.updatedQuantity}
              productItemId={productItemId}
              showLoading={showLoading}
              stopLoading={stopLoading}
              isLoggedIn={isLoggedIn}
              priceSnapshot={cartItem.priceSnapshot}
              isSelected={cartItem?.isSelected || true}
            />
            <Price
              basePrice={basePrice}
              discountedPrice={discountedPrice}
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
          <DeleteCartItem
            productItemId={productItemId}
            isLoggedIn={isLoggedIn}
            showLoading={showLoading}
            stopLoading={stopLoading}
            productImg={imgUrl}
          />
        </Group>
      </Box>
    </Card>
  );
};

export default CartItemCard;
