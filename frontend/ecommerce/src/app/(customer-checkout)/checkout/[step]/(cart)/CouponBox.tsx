import { CartItemDTO, CartProductsDTO } from "@/constants/types";
import { formattedPrice } from "@/utils/helperFunctions";
import {
  useAllCoupons,
  useCartActions,
  useCartItems,
  useSelectedCouponDetails,
} from "@/utils/store/cart";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Input,
  Modal,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTag } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export interface CouponTypeDTO {
  couponCode: string;
  discountPercent: number;
  description: string;
  expiresOn: string;
  minPurchaseAmount: number;
}

function getBestCoupon(
  allCoupons: CouponTypeDTO[],
  purchaseAmount: number,
): CouponTypeDTO | undefined {
  const val = allCoupons
    .filter((coupon) => coupon.minPurchaseAmount <= purchaseAmount)
    .reduce<CouponTypeDTO | null>((best, current) => {
      if (!best) return current;
      return current.minPurchaseAmount > best.minPurchaseAmount
        ? current
        : best;
    }, null);
  return val === null ? undefined : val;
}

const CouponBoxModal = ({
  opened,
  close,
  cartProducts,
}: {
  opened: boolean;
  close: () => void;
  cartProducts: CartProductsDTO;
}) => {
  const cartItems = useCartItems();

  const [textValue, setTextValue] = useState<string>("");
  const [textValueErr, setTextValueErr] = useState<{
    error: boolean;
    msg: string;
  }>({ error: false, msg: "" });
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState<number>(0);
  const [selectedCoupon, setSelectedCoupon] = useState<
    CouponTypeDTO | undefined
  >(undefined);
  const { setSelectedCouponCode } = useCartActions();
  const coupons = useAllCoupons();
  const couponFromStore = useSelectedCouponDetails();
  const getTotalDiscountedPriceTemp = (cartItems: CartItemDTO[]) => {
    return cartItems
      .filter((ci) => ci.isSelected)
      .reduce(
        (sum, item) =>
          (sum +=
            cartProducts[item.productItemId].discountedPrice *
            item.updatedQuantity),
        0,
      );
  };
  useEffect(() => {
    const totalDiscountedPriceTemp = getTotalDiscountedPriceTemp(cartItems);
    setTotalDiscountedPrice(totalDiscountedPriceTemp);
    setSelectedCoupon(
      couponFromStore
        ? coupons.find((c) => c.couponCode === couponFromStore.couponCode)
        : getBestCoupon(coupons, totalDiscountedPriceTemp),
    );
  }, [cartItems]);

  const handleCheck = () => {
    const couponExists = coupons.find(
      (c) => c.couponCode.toLowerCase() === textValue.toLowerCase(),
    );
    if (couponExists) {
      if (
        couponExists.minPurchaseAmount <= getTotalDiscountedPriceTemp(cartItems)
      ) {
        setSelectedCoupon(couponExists);
        setTextValueErr({
          error: false,
          msg: "",
        });
      } else {
        setSelectedCoupon(undefined);
        setTextValueErr({
          error: true,
          msg: `Shop more ${formattedPrice(
            couponExists.minPurchaseAmount -
              getTotalDiscountedPriceTemp(cartItems),
          )} to apply this coupon.`,
        });
      }
    } else {
      setSelectedCoupon(undefined);
      setTextValueErr({
        error: true,
        msg: "Sorry, this coupon is not valid for this user account.",
      });
    }
  };

  const handleCloseModal = () => {
    close();
    setTextValue("");
    setTextValueErr({ error: true, msg: "" });
    const totalDiscountedPriceTemp = getTotalDiscountedPriceTemp(cartItems);
    setTotalDiscountedPrice(totalDiscountedPriceTemp);
    setSelectedCoupon(
      couponFromStore
        ? coupons.find((c) => c.couponCode === couponFromStore.couponCode)
        : getBestCoupon(coupons, totalDiscountedPriceTemp),
    );
  };
  const applyCoupon = () => {
    if (selectedCoupon) {
      setSelectedCouponCode(selectedCoupon.couponCode);
    } else {
      setSelectedCouponCode(undefined);
    }
    close();
    setTextValue("");
    setTextValueErr({ error: true, msg: "" });
  };
  return (
    <Modal
      opened={opened}
      onClose={handleCloseModal}
      title="Apply Coupon"
      size={"lg"}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Box style={{ backgroundColor: "var(--mantine-color-black-1)" }}>
        <Divider />
        <Card mb={8}>
          <Box display={"flex"} style={{ gap: "8px" }}>
            <Input
              w="85%"
              placeholder="Enter coupon code"
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value.trim());
                if (e.target.value.trim() === "")
                  setTextValueErr({ error: true, msg: "" });
              }}
              styles={{
                section: { width: "150px", padding: 0 },
                input: {
                  border: "1px solid var(--mantine-color-black-1)",
                  paddingRight: 0,
                },
              }}
            />
            <Button
              color="primaryDark.7"
              disabled={textValue === ""}
              onClick={handleCheck}
            >
              <Text lts={1} size="xs" fw={600}>
                CHECK
              </Text>
            </Button>
          </Box>
          {textValueErr.error ? (
            <Text size="xs" c="red" p={4}>
              {textValueErr.msg}
            </Text>
          ) : null}
        </Card>
        <ScrollArea h={"50vh"}>
          <Stack gap={8}>
            {coupons.map((c) => (
              <Card bdrs={0}>
                <Group align="start">
                  <Checkbox
                    disabled={
                      getTotalDiscountedPriceTemp(cartItems) <
                      c.minPurchaseAmount
                    }
                    style={{ cursor: "pointer" }}
                    checked={
                      selectedCoupon
                        ? selectedCoupon.couponCode === c.couponCode
                        : false
                    }
                    onClick={() => {
                      if (
                        selectedCoupon &&
                        selectedCoupon.couponCode === c.couponCode
                      )
                        setSelectedCoupon(undefined);
                      else setSelectedCoupon(c);
                    }}
                    color={"primaryDark.7"}
                    size="xs"
                    pt={10}
                  />
                  <Stack gap={16}>
                    <Box
                      bd={"1px dashed var(--mantine-color-primaryDark-7)"}
                      px={16}
                      py={6}
                      bdrs={"xs"}
                      w="max-content"
                    >
                      <Text size="sm" c={"primaryDark.7"} fw={500}>
                        {c.couponCode}
                      </Text>
                    </Box>
                    <Stack gap={8}>
                      {getTotalDiscountedPriceTemp(cartItems) <
                      c.minPurchaseAmount ? (
                        <Text size="xs" c="red">
                          {`Shop more ${formattedPrice(
                            c.minPurchaseAmount -
                              getTotalDiscountedPriceTemp(cartItems),
                          )} to apply this coupon.`}
                        </Text>
                      ) : null}
                      <Text fw={600} size="sm" lts={0.3}>
                        {`Save ${formattedPrice(
                          (totalDiscountedPrice * c.discountPercent) / 100,
                        )}`}
                      </Text>
                      <Text size="13px" lts={0.3} c="black.7">
                        {c.description}
                      </Text>
                      <Text size="13px" lts={0.3} c="black.7">
                        Expires on: {c.expiresOn}
                      </Text>
                    </Stack>
                  </Stack>
                </Group>
              </Card>
            ))}
          </Stack>
        </ScrollArea>
        <Box>
          <Box
            w="100%"
            display={"flex"}
            p={12}
            style={{
              alignItems: "center",
              gap: 8,
              borderTop: "2px solid var(--mantine-color-gray-1)",
              backgroundColor: "white",
            }}
          >
            <Stack flex={1} gap={2} pl={48}>
              <Text size="xs" c="dimmed" fw={600}>
                Maximum Savings:
              </Text>
              <Text fw={500}>
                {selectedCoupon
                  ? formattedPrice(
                      (totalDiscountedPrice * selectedCoupon.discountPercent) /
                        100,
                    )
                  : formattedPrice(0)}
              </Text>
            </Stack>
            <Button
              color="primaryDark.7"
              fullWidth
              flex={1}
              onClick={applyCoupon}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const CouponBox = ({ cartProducts }: { cartProducts: CartProductsDTO }) => {
  const [opened, { open, close }] = useDisclosure(false);
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
        <CouponBoxModal
          cartProducts={cartProducts}
          close={close}
          opened={opened}
        />
        <Button
          variant="outline"
          color={"primaryDark.7"}
          size="xs"
          onClick={open}
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

export default CouponBox;
