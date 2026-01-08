"use client";

import { uploadToS3, notify } from "@/utils/helperFunctions";
import {
  Box,
  SimpleGrid,
  Paper,
  Stack,
  ActionIcon,
  Text,
  Group,
  Image,
  LoadingOverlay,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import { useUncontrolled } from "@mantine/hooks";
import { CustomInputProps } from "../CustomRichTextEditor";
import { useEffect, useState } from "react";

type UploadDropzone = {
  visible: boolean;
  open: () => void;
  close: () => void;
  withAsterisk?: boolean;
} & CustomInputProps<string>;
const UploadDropzone = ({
  withAsterisk = false,
  label = "",
  value,
  defaultValue,
  onChange,
  errors,
  field,
  visible,
  open,
  close,
}: UploadDropzone) => {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });
  const [img, setImg] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    if (img) handleChange(img);
    else handleChange("");
  }, [img]);

  return (
    <>
      <Group gap={4}>
        <Text size="sm" mb={2} fw={500}>
          {label}
        </Text>
        {withAsterisk && (
          <Text c="red" size="sm">
            *
          </Text>
        )}
      </Group>
      <Box p={16} bdrs={"sm"} bd={"1px solid black.4"}>
        <Stack gap="lg" pos="relative">
          <LoadingOverlay
            visible={visible}
            loaderProps={{ children: "Uploading..." }}
          />
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
                  setImg(uploadedUrl);
                } catch {
                  notify({
                    variant: "error",
                    title: "Error!",
                    message: "Failed to upload image.",
                  });
                } finally {
                  close();
                }
              }}
              maxFiles={1}
              accept={[
                MIME_TYPES.jpeg,
                MIME_TYPES.png,
                MIME_TYPES.webp,
                MIME_TYPES.avif,
              ]}
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
                    <span style={{ color: "gray" }}>or drag & drop Images</span>
                  </Text>
                </Stack>
              </Paper>
            </Dropzone>
            {img && (
              <Paper withBorder radius="md" pos="relative" p={2}>
                <Image
                  src={img}
                  m={"auto"}
                  bdrs={"md"}
                  h={150}
                  radius="md"
                  fit="cover"
                />
                <ActionIcon
                  color="red"
                  size="sm"
                  pos="absolute"
                  top={6}
                  right={6}
                  onClick={() => {
                    setImg(undefined);
                  }}
                >
                  <IconTrash size={14} />
                </ActionIcon>
              </Paper>
            )}
          </SimpleGrid>
        </Stack>
      </Box>
      {errors && (
        <Text size="xs" c="red" mt={2}>
          {errors[field]}
        </Text>
      )}
    </>
  );
};

export default UploadDropzone;
