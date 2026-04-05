import { IconCross, IconTrash, IconX } from "@tabler/icons-react";
import {
  moveFromCartToWishlisted,
  removeFromCartAction,
} from "../../cartActions";
import { useCartActions } from "@/utils/store/cart";
import { dummyDelay, notify } from "@/utils/helperFunctions";
import { useDisclosure } from "@mantine/hooks";
import { Box, Button, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import Image from "next/image";
import { ErrorResponse } from "@/constants/types";

const DeleteCartItem = ({
  productItemId,
  isLoggedIn,
  showLoading,
  stopLoading,
  productImg,
}: {
  productItemId: string;
  isLoggedIn: boolean;
  showLoading: () => void;
  stopLoading: () => void;
  productImg: string;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { removeFromCart } = useCartActions();
  const handleRemoveFromCart = async () => {
    try {
      showLoading();
      if (isLoggedIn) {
        await removeFromCartAction(productItemId);
      }
      removeFromCart(productItemId);
      notify({
        variant: "success",
        title: "Success!",
        message: "Item removed from cart successfully!",
      });
    } catch (err) {
      (err as Error)?.message || "Failed to remove item from cart!"
    } finally {
      stopLoading();
      close();
    }
  };
  const handleMoveToWishlist = async () => {
    try {
      showLoading();
      if (!isLoggedIn) {
        notify({
          variant: "error",
          title: "Error!",
          message: "Please log in first!",
        });
        return;
      }
      await moveFromCartToWishlisted(productItemId);
      removeFromCart(productItemId);
      notify({
        variant: "success",
        title: "Success!",
        message: "Item move to wishlist successfully!",
      });
    } catch (err) {
      console.log(err);
      notify({
        variant: "error",
        title: "Error!",
        message: (err as Error)?.message || "Failed to move item to wishlist!",
      });
    } finally {
      stopLoading();
      close();
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        withCloseButton={false}
        yOffset="25vh"
        onClose={close}
        styles={{
          body: {
            paddingBottom: 0,
          },
        }}
      >
        <Box display="flex" style={{ gap: "16px" }}>
          <Image src={productImg} alt="item" height={80} width={60} />
          <Box
            display="flex"
            w={"100%"}
            style={{ justifyContent: "space-between" }}
          >
            <Stack gap={4}>
              <Text size="sm" fw={600}>
                Move From Bag
              </Text>
              <Text size="sm">
                Are you sure you want to move this item from bag?
              </Text>
            </Stack>
            <IconX
              onClick={close}
              size={"18px"}
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Box>
        <Divider mt={12} color="black.1" />
        <Group justify="center">
          <Group my={6}>
            <Button
              variant="transparent"
              c="black.7"
              onClick={handleRemoveFromCart}
            >
              <Text tt="uppercase" size="xs" fw={600} lts={0.5}>
                Remove
              </Text>
            </Button>
            <Divider orientation="vertical" color="black.1" />
            <Button variant="transparent" onClick={handleMoveToWishlist}>
              <Text
                tt="uppercase"
                c="primaryDark.7"
                size="xs"
                fw={600}
                lts={0.5}
              >
                Move to wishlist
              </Text>
            </Button>
          </Group>
        </Group>
      </Modal>
      <IconTrash
        color="var(--mantine-color-primaryDark-5)"
        size={18}
        style={{ cursor: "pointer" }}
        onClick={open}
      />
    </>
  );
};

export default DeleteCartItem;
