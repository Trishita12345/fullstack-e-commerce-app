
'use server';
import { serverApiFetch } from "@/lib/serverApiFetch";

async function getPresignedUrl(file: File) {
  console.log("file: ", file.type)
  const { url } = await serverApiFetch<{ url: string }>(
    "/product-service/s3/presign",
    {
      method: "POST",
      body: {
        key: `temp/${crypto.randomUUID()}-${file.name}`,
        contentType: file.type,
      },
      headers: { "Content-Type": "application/json" },
    },
  );
  console.log("url", url)
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
    await serverApiFetch<null>(`/product-service/s3/images`, {
      method: "DELETE",
      body: {
        key: extractS3Key(file),
      },
    });
  }
}