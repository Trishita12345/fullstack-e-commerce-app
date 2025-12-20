import {
  Button,
  type ButtonProps,
  type MantineColor,
  Text,
  Tooltip,
} from "@mantine/core";
import type { Icon } from "@tabler/icons-react";
import type { Ref } from "react";

export const ActionButton = ({
  Icon,
  label,
  c,
  onClick,
  ref,
  type = "button",
  ...props
}: {
  onClick?: () => void;
  c: MantineColor;
  Icon: Icon;
  label?: string;
  ref?: Ref<HTMLDivElement>;
  type?: "button" | "submit" | "reset";
} & ButtonProps) => {
  return (
    <Tooltip label={label} ref={ref}>
      <Button
        variant={"subtle"}
        onClick={onClick}
        type={type}
        c={props.disabled ? "var(--mantine-color-disabled-color)" : c}
        {...props}
      >
        <Icon /> <Text ml={8}>{label}</Text>
      </Button>
    </Tooltip>
  );
};
