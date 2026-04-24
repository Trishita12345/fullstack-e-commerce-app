import { notify } from "@/utils/helperFunctions";
import {
  Button,
  Card,
  Group,
  RadioIndicator,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { placeOrder } from "../../paymentActions";
import {
  useCartItems,
  useDonation,
  useGiftWrap,
  useSelectedCouponCode,
} from "@/utils/store/cart";
import { ErrorResponse, PaymentModeType, PlaceOrderReqDTO } from "@/constants/types";
import { useRouter } from "next/navigation";
import { useSelectedAddressId } from "@/utils/store/address";
interface ModeCardProps {
  mode: PaymentModeType;
  selectedMode: PaymentModeType;
  onClick: () => void;
  title: string;
  subtitle: string;
}
const ModeCard = ({
  mode,
  selectedMode,
  onClick,
  title,
  subtitle,
}: ModeCardProps) => {
  const isSelected = mode === selectedMode;
  return (
    <Card
      radius="md"
      shadow="md"
      bd={`1.5px solid ${isSelected ? "var(--mantine-color-primaryDark-4)" : "var(--mantine-color-gray-2)"}`}
    >
      <Group justify="space-between" ta={"center"}>
        <RadioIndicator
          color="primaryDark.7"
          checked={isSelected}
          onClick={onClick}
        />
        <Stack>
          <Text
            fw={isSelected ? 700 : 400}
            c={
              isSelected
                ? "var(--mantine-color-primaryDark-4)"
                : "var(--mantine-color-black-6)"
            }
            size="sm"
          >
            {title}
          </Text>
          <Text
            fw={isSelected ? 700 : 400}
            c={
              isSelected
                ? "var(--mantine-color-primaryDark-4)"
                : "var(--mantine-color-black-6)"
            }
            size="10px"
          >
            {subtitle}
          </Text>
        </Stack>
        <Image
          src={`/assets/${mode}.svg`}
          height={60}
          width={60}
          alt={mode}
          style={{ filter: !isSelected ? "grayscale(1)" : "" }}
        />
      </Group>
    </Card>
  );
};
const modeData = {
  COD: {
    title: "Cash on Delivery ( COD )",
    subtitle: "Pay once the product reached to you, after delivery.",
  },
  PREPAID: {
    title: "Paid ( Prepaid - Card / UPI )",
    subtitle: "Pay now using UPI or CARD for hassle free experience",
  },
};
const PaymentOptionsSection = ({
  showLoading,
  stopLoading,
}: {
  showLoading: () => void;
  stopLoading: () => void;
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const donation = useDonation();
  const giftWrap = useGiftWrap();
  const selectedCouponCode = useSelectedCouponCode();
  const [mode, setMode] = useState<PaymentModeType>(PaymentModeType.PREPAID);
  const selectedCartItems = useCartItems().filter((c) => c.isSelected);
  const selectedAddressId = useSelectedAddressId();

  const router = useRouter();
  const handlePlaceOrder = async () => {
    try {
      setIsDisabled(true);
      showLoading();
      const body: PlaceOrderReqDTO = {
        donation,
        giftWrap,
        selectedCouponCode,
        paymentMode: mode,
        paymentGateway: mode === PaymentModeType.COD ? undefined : "RAZORPAY",
        deliveryAddressId: selectedAddressId!,
      };
      const orderId = await placeOrder(body);
      router.push("/create-checkout-session?orderId=" + orderId);
    } catch (err) {
      console.log(err);
      notify({
        variant: "error",
        title: "Error!",
        message: (err as Error)?.message || "Failed to place order!",
      });
      setIsDisabled(false);
      stopLoading();
    }
  };
  return (
    <Stack my={24}>
      <Text size="lg" fw={600}>
        Select Mode of Payment
      </Text>

      <ModeCard
        mode={PaymentModeType.COD}
        selectedMode={mode}
        onClick={() => setMode(PaymentModeType.COD)}
        title={modeData[PaymentModeType.COD].title}
        subtitle={modeData[PaymentModeType.COD].subtitle}
      />
      <ModeCard
        mode={PaymentModeType.PREPAID}
        selectedMode={mode}
        onClick={() => setMode(PaymentModeType.PREPAID)}
        title={modeData[PaymentModeType.PREPAID].title}
        subtitle={modeData[PaymentModeType.PREPAID].subtitle}
      />

      <Button
        radius={"md"}
        color="primaryDark.8"
        onClick={handlePlaceOrder}
        disabled={
          isDisabled ||
          selectedCartItems.length === 0 ||
          selectedAddressId === undefined
        }
      >
        Place Order
      </Button>
    </Stack>
  );
};

export default PaymentOptionsSection;
