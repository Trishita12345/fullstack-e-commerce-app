import {
  Button,
  type ButtonProps,
  type MantineColor,
  Text,
  Tooltip,
} from "@mantine/core";
import type { Ref } from "react";
import React from "react";

export const ActionButton = ({
  Icon,
  label,
  c = "black.9",
  color,
  onClick,
  variant,
  size,
  style,
}: {
  onClick?: () => void;
  c?: MantineColor;
  Icon: React.ReactNode;
  label?: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
  type?: "button" | "submit" | "reset";
  variant?: string;
  size?: string;
} & ButtonProps) => {
  return (
    <>
      <Tooltip label={<Text size="xs">{label}</Text>}>
        <Button
          onClick={onClick}
          hiddenFrom="md"
          variant={variant || "outline"}
          size={size || "xs"}
          color={color || "black.9"}
          c={c || "white"}
          style={style}
        >
          {Icon}
        </Button>
      </Tooltip>
      <Button
        onClick={onClick}
        visibleFrom="md"
        variant={variant || "outline"}
        size={size || "xs"}
        color={color || "black.9"}
        c={c || "white"}
        style={style}
        leftSection={Icon}
      >
        <Text size={size || "xs"}>{label}</Text>
      </Button>
    </>
  );
};
