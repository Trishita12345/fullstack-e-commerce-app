"use client";
import CustomerCheckoutHeader, {
  StepType,
} from "@/(components)/CustomerCheckoutHeader";
import Cart from "./(cart)";
import { Box, Loader, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "next/navigation";

const Checkout = () => {
  const { step } = useParams<{ step: string }>();
  const [visible, { open, close }] = useDisclosure(false);
  return (
    <Box pos="relative">
      <LoadingOverlay
        zIndex={10000}
        visible={visible}
        loaderProps={{
          children: <Loader size={30} color="primaryDark.7" />,
        }}
      />
      <CustomerCheckoutHeader step={step as StepType} />
      <Box py={8}>
        {step === "cart" && <Cart showLoading={open} stopLoading={close} />}
      </Box>
    </Box>
  );
};

export default Checkout;
