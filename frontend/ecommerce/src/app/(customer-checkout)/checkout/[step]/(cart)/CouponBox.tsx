import { CartItemDTO, CartProductsDTO } from "@/constants/types";
import { formattedPrice } from "@/utils/helperFunctions";
import { useCartActions, useCartItems, useCoupon } from "@/utils/store/cart";
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

const coupons: CouponTypeDTO[] = [
  {
    couponCode: "PREPAID5",
    discountPercent: 5,
    description: "5%  off on all prepaid orders.",
    expiresOn: "18th January 2026 | 11:59 PM",
    minPurchaseAmount: 0,
  },
  {
    couponCode: "SAVE10",
    discountPercent: 10,
    description: "10%  off on minimum purchase of Rs. 999.",
    expiresOn: "18th January 2026 | 11:59 PM",
    minPurchaseAmount: 999,
  },
  {
    couponCode: "SAVE15",
    discountPercent: 15,
    description: "15%  off on minimum purchase of Rs. 1499.",
    expiresOn: "18th January 2026 | 11:59 PM",
    minPurchaseAmount: 1499,
  },
  {
    couponCode: "SAVE20",
    discountPercent: 20,
    description: "20%  off on minimum purchase of Rs. 1999.",
    expiresOn: "18th January 2026 | 11:59 PM",
    minPurchaseAmount: 1999,
  },
];
function getBestCoupon(purchaseAmount: number): CouponTypeDTO | undefined {
  const val = coupons
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
  const [textValueErr, setTextValueErr] = useState<boolean>(false);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState<number>(0);
  const [selectedCoupon, setSelectedCoupon] = useState<
    CouponTypeDTO | undefined
  >(undefined);
  const { setCoupon } = useCartActions();
  const couponFromStore = useCoupon();
  const getTotalDiscountedPriceTemp = (cartItems: CartItemDTO[]) => {
    return cartItems.reduce(
      (sum, item) =>
        (sum +=
          cartProducts[item.productItemId].discountedPrice * item.quantity),
      0
    );
  };
  useEffect(() => {
    const totalDiscountedPriceTemp = getTotalDiscountedPriceTemp(cartItems);
    setTotalDiscountedPrice(totalDiscountedPriceTemp);
    setSelectedCoupon(
      couponFromStore.couponCode !== ""
        ? coupons.find((c) => c.couponCode === couponFromStore.couponCode)
        : getBestCoupon(totalDiscountedPriceTemp)
    );
  }, [cartItems]);

  const handleCheck = () => {
    const couponExists = coupons.find((c) => c.couponCode === textValue);
    setSelectedCoupon(couponExists);
    setTextValueErr(couponExists === undefined);
  };

  const handleCloseModal = () => {
    close();
    setTextValue("");
    setTextValueErr(false);
    const totalDiscountedPriceTemp = getTotalDiscountedPriceTemp(cartItems);
    setTotalDiscountedPrice(totalDiscountedPriceTemp);
    setSelectedCoupon(
      couponFromStore.couponCode !== ""
        ? coupons.find((c) => c.couponCode === couponFromStore.couponCode)
        : getBestCoupon(totalDiscountedPriceTemp)
    );
  };
  const applyCoupon = () => {
    if (selectedCoupon) {
      setCoupon(
        selectedCoupon.couponCode,
        (totalDiscountedPrice * selectedCoupon.discountPercent) / 100
      );
    } else {
      setCoupon("", 0);
    }
    close();
    setTextValue("");
    setTextValueErr(false);
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
                if (e.target.value.trim() === "") setTextValueErr(false);
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
          {textValueErr ? (
            <Text size="xs" c="red" p={4}>
              Sorry, this coupon is not valid for this user account.
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
                              getTotalDiscountedPriceTemp(cartItems)
                          )} to apply this coupon.`}
                        </Text>
                      ) : null}
                      <Text fw={600} size="sm" lts={0.3}>
                        {`Save ${formattedPrice(
                          (totalDiscountedPrice * c.discountPercent) / 100
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
                        100
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
