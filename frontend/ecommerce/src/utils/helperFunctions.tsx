import { showNotification } from "@mantine/notifications";
import { IconCheck, IconExclamationMark, IconX } from "@tabler/icons-react";

export function formattedPrice(amount: number) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2, // no paise
  }).format(amount);

  return formatted;
}

export function notify({
  variant,
  title,
  message,
}: {
  variant: "info" | "error" | "success" | "warning";
  title: string;
  message: string;
}) {
  let Icon, color;
  if (variant === "success") {
    Icon = IconCheck;
    color = "green";
  } else if (variant === "error") {
    Icon = IconX;
    color = "red";
  } else if (variant === "info") {
    Icon = IconExclamationMark;
    color = "blue";
  } else {
    Icon = IconExclamationMark;
    color = "yellow";
  }
  showNotification({
    id: "notify",
    position: "top-right",
    withCloseButton: true,
    autoClose: 5000,
    title,
    message,
    color,
    icon: <Icon size={20} />,
    loading: false,
  });
}
