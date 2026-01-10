import { ShareProductType } from "@/app/(customer)/products/[productId]/(components)/ImageComponent";
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

async function getPresignedUrl(file: File) {
  const { url } = await apiFetch<{ url: string }>("/s3/presign", {
    method: "POST",
    body: {
      key: `temp/${crypto.randomUUID()}-${file.name}`,
      contentType: file.type,
    },
    headers: { "Content-Type": "application/json" },
  });
  return url;
}

export async function uploadToS3(file: File) {
  const url = await getPresignedUrl(file);
  await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  return url.split("?")[0]; // public S3 URL
}

function extractS3Key(s3Url: string) {
  if (!s3Url) return "";

  try {
    const url = new URL(s3Url);
    let key = url.pathname; // "/products/123/image.png"

    // remove leading "/"
    if (key.startsWith("/")) {
      key = key.slice(1);
    }

    return key;
  } catch {
    console.error("Invalid S3 URL:", s3Url);
    return "";
  }
}

export async function deleteImageS3(file: string) {
  if (file.includes("/temp/")) {
    await apiFetch<null>(`/s3/images`, {
      method: "DELETE",
      body: {
        key: extractS3Key(file),
      },
    });
  }
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
  session?: boolean
) => {
  if (session) {
    sessionStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, value);
  }
};

export const fetchFromStorage = (key: string, session?: boolean) => {
  if (session) {
    return sessionStorage.getItem(key);
  } else {
    return localStorage.getItem(key);
  }
};

export const removeFromStorage = (key: string, session?: boolean) => {
  if (session) {
    sessionStorage.removeItem(key);
  } else {
    localStorage.removeItem(key);
  }
};

export const clearStorage = (level: "session" | "local" | "all" = "local") => {
  switch (level) {
    case "session":
      sessionStorage.clear();
      break;
    case "local":
      localStorage.clear();
      break;
    case "all":
      sessionStorage.clear();
      localStorage.clear();
      break;
  }
};
