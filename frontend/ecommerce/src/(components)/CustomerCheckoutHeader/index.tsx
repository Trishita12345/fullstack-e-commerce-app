import { Card } from "@mantine/core";

export type StepType = "cart" | "address" | "payment";

const CustomerCheckoutHeader = ({ step }: { step: StepType }) => {
  return (
    <Card w="100%" h="100px">
      {step}
    </Card>
  );
};

export default CustomerCheckoutHeader;
