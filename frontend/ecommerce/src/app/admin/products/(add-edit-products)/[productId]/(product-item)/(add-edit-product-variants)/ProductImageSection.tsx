"use client";

import { apiFetch } from "@/lib/apiFetch";
import { notify } from "@/utils/helperFunctions";
import {
  Box,
  Text,
  Image,
  SimpleGrid,
  ActionIcon,
  Stack,
  Paper,
  Group,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export function ProductImagesSection() {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

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

  async function uploadToS3(file: File) {
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
    } catch (e) {
      console.error("Invalid S3 URL:", s3Url);
      return "";
    }
  }

  console.log("images", images);
  function deleteImageS3(file: string) {
    if (file.includes("/temp/")) {
      apiFetch(`/s3/images`, {
        method: "DELETE",
        body: {
          key: extractS3Key(file),
        },
      });
    }
  }

  return (
    <Stack gap={0}>
      <Text fw={600}>Product Images</Text>
      <Box p={16} bdrs={"md"} bd={"1px solid gray.1"}>
        <Stack gap="lg">
          <Box>
            <Text size="xs" mb={4}>
              Upload Thumbnail
            </Text>
            <SimpleGrid
              cols={{ base: 2, md: 2, lg: 4 }}
              spacing="sm"
              style={{
                overflowY: "scroll",
              }}
            >
              <Dropzone
                onDrop={async (files: File[]) => {
                  const uploadedUrl = await uploadToS3(files[0]);
                  setThumbnail(uploadedUrl);
                }}
                maxFiles={1}
                accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.webp]}
              >
                <Paper
                  h={158}
                  withBorder
                  bd={"1px dashed gray.1"}
                  radius="md"
                  p={{ base: "xl", lg: "lg" }}
                  style={{ textAlign: "center" }}
                >
                  <Stack align="center" gap={6}>
                    <IconPhoto size={24} opacity={0.6} />
                    <Text c={"primaryDark.7"} size="xs" display={"inline"}>
                      Click to upload{" "}
                      <span style={{ color: "gray" }}>
                        or drag & drop Images
                      </span>
                    </Text>
                  </Stack>
                </Paper>
              </Dropzone>
              {thumbnail && (
                <Paper withBorder radius="md" pos="relative" p={2}>
                  <Image
                    src={thumbnail}
                    m={"auto"}
                    bdrs={"md"}
                    h={150}
                    radius="md"
                    fit="cover"
                  />
                  <ActionIcon
                    color="red"
                    // variant="light"
                    size="sm"
                    pos="absolute"
                    top={6}
                    right={6}
                    onClick={() => {
                      deleteImageS3(thumbnail);
                      setThumbnail(null);
                    }}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Paper>
              )}
            </SimpleGrid>
          </Box>

          <Box>
            <Text mb={4} size="xs">
              Upload More Product Images
            </Text>
            <SimpleGrid
              cols={{ base: 2, md: 2, lg: 4 }}
              spacing="sm"
              mah={250}
              style={{
                overflowY: "scroll",
              }}
            >
              <Dropzone
                onDrop={async (files: File[]) => {
                  const uploadPromises = files.map((file) => uploadToS3(file));
                  const uploadedUrls = await Promise.all(uploadPromises);
                  setImages((prev) => [...prev, ...uploadedUrls]);
                }}
                accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.webp]}
              >
                <Paper
                  h={158}
                  withBorder
                  bd={"1px dashed gray.1"}
                  radius="md"
                  p={{ base: "xl", lg: "lg" }}
                  style={{ textAlign: "center" }}
                >
                  <Stack align="center" gap={6}>
                    <IconPhoto size={24} opacity={0.6} />
                    <Text c={"primaryDark.7"} size="xs" display={"inline"}>
                      Click to upload{" "}
                      <span style={{ color: "gray" }}>
                        or drag & drop Images
                      </span>
                    </Text>
                  </Stack>
                </Paper>
              </Dropzone>

              {images.length > 0 &&
                images.map((file, index) => (
                  <Paper
                    key={index}
                    withBorder
                    radius="md"
                    p={2}
                    pos="relative"
                  >
                    <Image src={file} bdrs={"md"} h={150} fit="cover" />
                    <ActionIcon
                      color="red"
                      //   variant="light"
                      size="sm"
                      pos="absolute"
                      top={6}
                      right={6}
                      onClick={() => {
                        setImages((prev) => prev.filter((_, i) => i !== index));
                        deleteImageS3(file);
                      }}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Paper>
                ))}
            </SimpleGrid>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
