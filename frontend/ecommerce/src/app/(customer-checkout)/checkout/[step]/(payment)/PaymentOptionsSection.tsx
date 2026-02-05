import { notify } from "@/utils/helperFunctions";
import {
  faMoneyBill1Wave,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Group,
  RadioIndicator,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { title } from "process";
import { useState } from "react";
import { placeOrder } from "../../paymentActions";
interface ModeCardProps {
  mode: "COD" | "PAID";
  selectedMode: "COD" | "PAID";
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
  PAID: {
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
  const [mode, setMode] = useState<"COD" | "PAID">("COD");
  const handlePlaceOrder = async () => {
    try {
      showLoading();
      await placeOrder();
    } catch {
      notify({
        variant: "error",
        title: "Error!",
        message: "Failed to delete address!",
      });
    } finally {
      stopLoading();
    }
  };
  return (
    <Stack my={24}>
      <Text size="lg" fw={600}>
        Select Mode of Payment
      </Text>

      <ModeCard
        mode="COD"
        selectedMode={mode}
        onClick={() => setMode("COD")}
        title={modeData["COD"].title}
        subtitle={modeData["COD"].subtitle}
      />
      <ModeCard
        mode="PAID"
        selectedMode={mode}
        onClick={() => setMode("PAID")}
        title={modeData["PAID"].title}
        subtitle={modeData["PAID"].subtitle}
      />

      <Button radius={"md"} color="primaryDark.8" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </Stack>
  );
};

export default PaymentOptionsSection;
