"use client";

import { CustomInputProps } from "@/(components)/CustomRichTextEditor";
import { deleteImageS3, notify, uploadToS3 } from "@/utils/helperFunctions";
import {
  Box,
  Text,
  Image,
  SimpleGrid,
  ActionIcon,
  Stack,
  Paper,
  LoadingOverlay,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useDisclosure, useUncontrolled } from "@mantine/hooks";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function ProductImagesSection({
  value,
  defaultValue,
  onChange,
}: CustomInputProps<{
  url: string;
  isThumbnail: boolean
}[]>) {
  const [visible, { open, close }] = useDisclosure(false);
  const [thumbnail, setThumbnail] = useState<string | null>(
    defaultValue ? defaultValue.filter(img => img.isThumbnail)?.[0]?.url : null
  );
  const [images, setImages] = useState<string[]>(
    defaultValue ? defaultValue.filter(img => !img.isThumbnail).map(img => img.url) : []
  );
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  useEffect(() => {
    const imagesUrls = images.map(img => ({ url: img, isThumbnail: false }));
    if (thumbnail) {
      handleChange(
      [...imagesUrls,{
        url: thumbnail,
        isThumbnail: true
        },
      ]);
    }
    else handleChange([...imagesUrls]);
  }, [thumbnail, images]);
  console.log("images: ",thumbnail, images)
  return (
    <Stack gap={0}>
      <Text fw={600}>Product Images</Text>
      <Box p={16} bdrs={"md"} bd={"1px solid gray.1"}>
        <Stack gap="lg" pos="relative">
          <LoadingOverlay
            visible={visible}
            loaderProps={{ children: "Uploading..." }}
          />
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
                  try {
                    open();
                    const uploadedUrl = await uploadToS3(files[0]);
                    setThumbnail(uploadedUrl);
                  } catch {
                    notify({
                      variant: "error",
                      title: "Error!",
                      message: "Failed to upload thumbnail image.",
                    });
                  } finally {
                    close();
                  }
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
                  try {
                    open();
                    const uploadPromises = files.map((file) =>
                      uploadToS3(file)
                    );
                    const uploadedUrls = await Promise.all(uploadPromises);
                    setImages((prev) => [...prev, ...uploadedUrls]);
                  } catch {
                    notify({
                      variant: "error",
                      title: "Error!",
                      message: "Failed to upload images.",
                    });
                  } finally {
                    close();
                  }
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
                      size="sm"
                      pos="absolute"
                      top={6}
                      right={6}
                      onClick={() => {
                          open();
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                          close();
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
