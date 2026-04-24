import {
  Box,
  Button,
  Divider,
  Group,
  Stack,
  StepperStep,
  Text,
} from "@mantine/core";
import LogoText from "../logo/LogoText";
import { IconShieldCheckFilled } from "@tabler/icons-react";
import { SelectOptionType } from "@/constants/types";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

export type StepType = "cart" | "address" | "payment";
const stepArr: SelectOptionType[] = [
  { value: "cart", label: "BAG" },
  { value: "address", label: "ADDRESS" },
  { value: "payment", label: "PAYMENT" },
];

const CustomStepper = ({ step }: { step: StepType }) => {
  return (
    <Group gap={0}>
      {stepArr.map((sa, idx) => {
        const isActive = sa.value === step;
        const isActiveIdx = stepArr.findIndex((item) => item.value === step);
        const isDisabled = idx > isActiveIdx;
        return (
          <Fragment key={sa.value}>
            <Link href={!isDisabled ? `/checkout/${sa.value}` : ""}>
              <Button
                px={8}
                variant="transparent"
                c={isActive ? "primaryDark.5" : "dimmed"}
                style={{ cursor: !isDisabled ? "pointer" : "default" }}
              >
                <Stack
                  style={{
                    borderBottom: `2px solid ${
                      isActive
                        ? "var(--mantine-color-primaryDark-5)"
                        : "transparent"
                    }`,
                  }}
                >
                  <Text size="xs" lts={3} fw={500}>
                    {sa.label}
                  </Text>
                </Stack>
              </Button>
            </Link>
            {idx < stepArr.length - 1 && (
              <Text c={"dimmed"} size="xs">
                ---------
              </Text>
            )}
          </Fragment>
        );
      })}
    </Group>
  );
};

const CustomerCheckoutHeader = ({ step }: { step: StepType }) => {
  return (
    <Box>
      <Group
        w={{ base: "90%", md: "85%" }}
        mx="auto"
        py={16}
        align="center"
        justify="space-between"
      >
        <LogoText />
        <Box visibleFrom="sm">
          <CustomStepper step={step} />
        </Box>
        <Group gap={6}>
          <IconShieldCheckFilled color="#14CDA8" size={34} />
          <Text size="xs" lts={1.5} c={"black.7"} fw={500}>
            100% SECURE
          </Text>
        </Group>
      </Group>
      <Divider color="gray.1" />
    </Box>
  );
};

export default CustomerCheckoutHeader;
