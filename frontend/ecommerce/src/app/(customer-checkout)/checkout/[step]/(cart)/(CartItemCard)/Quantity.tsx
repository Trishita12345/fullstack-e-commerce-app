import { CartItemDbDTO, CartItemDTO } from "@/constants/types";
import { notify } from "@/utils/helperFunctions";
import { useCartActions } from "@/utils/store/cart";
import { Popover, Group, Text, Badge } from "@mantine/core";
import { IconCaretDownFilled, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { updateCartAction } from "../../../cartActions";

const Quantity = ({
  quantity,
  updatedQuantity,
  availableStock,
  productItemId,
  showLoading,
  stopLoading,
  isLoggedIn,
  priceSnapshot,
  isSelected,
}: {
  quantity: number;
  updatedQuantity: number;
  availableStock: number;
  productItemId: string;
  showLoading: () => void;
  stopLoading: () => void;
  isLoggedIn: boolean;
  priceSnapshot: number;
  isSelected: boolean;
}) => {
  const [opened, setOpened] = useState(false);
  const { updateCart } = useCartActions();
  const data = Array.from(
    { length: Math.min(availableStock, 25) },
    (_, i) => i + 1,
  );
  let message = null;

  switch (true) {
    case updatedQuantity === 0:
      message = "Product not available";
      break;

    case quantity !== updatedQuantity:
      message = `Quantity updated only ${availableStock} products left!`;
      break;

    case availableStock < 6:
      message = `Only ${availableStock} left!`;
      break;

    default:
      message = null;
  }

  const setValue = async (value: number) => {
    try {
      const payload: CartItemDbDTO = {
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
    <Group>
      <Popover
        width={200}
        position="bottom"
        withArrow
        shadow="md"
        opened={opened}
        onDismiss={() => setOpened(false)}
      >
        <Popover.Target>
          <Group
            gap={8}
            bdrs={3}
            w="max-content"
            px={8}
            py={2}
            style={{
              cursor: updatedQuantity > 0 ? "pointer" : "default",
              backgroundColor: "var(--mantine-color-black-1)",
            }}
            onClick={() => {
              updatedQuantity > 0 && setOpened((prev) => !prev);
            }}
          >
            <Text
              size="xs"
              fw={600}
              td={updatedQuantity > 0 ? "none" : "line-through"}
            >
              {`Qty: ${updatedQuantity || quantity}`}
            </Text>
            {updatedQuantity > 0 && <IconCaretDownFilled size={"12px"} />}
          </Group>
        </Popover.Target>
        <Popover.Dropdown
          h="50vh"
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
                  display={i === updatedQuantity ? "inline" : "none"}
                  color="var(--mantine-color-black-3)"
                />
                <Text size="xs">{i}</Text>
              </Group>
            );
          })}
        </Popover.Dropdown>
      </Popover>
      {message && (
        <Badge bdrs={2} variant="outline" size="xs" color="red">
          <Text size="10px" fw={500} tt={"none"}>
            {message}
          </Text>
        </Badge>
      )}
    </Group>
  );
};
export default Quantity;
