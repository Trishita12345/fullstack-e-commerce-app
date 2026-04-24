import { ShareProductType } from "@/app/(customer)/products/[productItemId]/(components)/ImageComponent";
import { apiFetch } from "@/lib/apiFetch";
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
type NotificationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export function notify({
  variant,
  title,
  message,
  position = "top-center",
}: {
  variant: "info" | "error" | "success" | "warning";
  title: string;
  message: string;
  position?: NotificationPosition;
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
    position,
    withCloseButton: true,
    autoClose: 5000,
    title,
    message,
    color,
    icon: <Icon size={20} />,
    loading: false,
  });
}



export const shareProduct = async (product: ShareProductType) => {
  if (!navigator.share) return;

  await navigator.share({
    title: `Check out this ${product.name} on our store`,
    text: `Check out this ${product.name} on our store`,
    url: `${window.location.origin}/product/${product.id}`,
  });
};
export const saveToStorage = (
  key: string,
  value: string,
  session?: boolean,
) => {
  if (session) {
    sessionStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, value);
  }
};

export const dummyDelay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export function decodeSkuToken(token: string) {
  if (!token) return [];
  return token
    .replace("_", " ")
    .split("-")
    .slice(1, -1)
    .map((word) => word.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()));
}
export const scrollToId = (id: string, offset = 0) => {
  const element = document.getElementById(id);
  if (!element) return;

  const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};
export function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getRandomValue(arrLength: number): number {
  const randomIndex = Math.floor(Math.random() * arrLength);
  return randomIndex;
}

export function copyText(text: string) {
  navigator.clipboard.writeText(text)
}