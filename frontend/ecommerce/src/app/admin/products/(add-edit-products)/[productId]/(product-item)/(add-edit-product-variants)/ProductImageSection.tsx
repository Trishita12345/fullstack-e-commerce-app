"use client";

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
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  console.log(thumbnail, images);
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
                onDrop={(files) => setThumbnail(files[0])}
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
                    src={URL.createObjectURL(thumbnail)}
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
                onDrop={(files) => setImages((prev) => [...prev, ...files])}
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
                    <Image
                      src={URL.createObjectURL(file)}
                      bdrs={"md"}
                      h={150}
                      fit="cover"
                    />
                    <ActionIcon
                      color="red"
                      //   variant="light"
                      size="sm"
                      pos="absolute"
                      top={6}
                      right={6}
                      onClick={() =>
                        setImages((prev) => prev.filter((_, i) => i !== index))
                      }
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
