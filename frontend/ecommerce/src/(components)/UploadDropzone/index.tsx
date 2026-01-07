import { uploadToS3, notify } from "@/utils/helperFunctions";
import { Box, SimpleGrid, Paper, Stack, ActionIcon, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import ResponsiveImage from "../responsiveImage";
import { useUncontrolled } from "@mantine/hooks";
import { CustomInputProps } from "../CustomRichTextEditor";

const UploadDropzone = ({
  withAsterisk = false,
  label = "",
  value,
  defaultValue,
  onChange,
  errors,
  field,
}: CustomInputProps<string>) => {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });
  return (
    <Box>
      <Text size="sm" mb={4} fw={500}>
        {label}
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
              handleChange(uploadedUrl);
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
                <span style={{ color: "gray" }}>or drag & drop Images</span>
              </Text>
            </Stack>
          </Paper>
        </Dropzone>
        {value ??
          (defaultValue && (
            <Paper withBorder radius="md" pos="relative" p={2}>
              <ResponsiveImage
                src={value ?? defaultValue}
                height={150}
                width={150}
                objectFit="cover"
              />
              <ActionIcon
                color="red"
                size="sm"
                pos="absolute"
                top={6}
                right={6}
                onClick={() => {
                  handleChange("");
                }}
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Paper>
          ))}
      </SimpleGrid>
      {errors && (
        <Text size="xs" c="red">
          {errors[field]}
        </Text>
      )}
    </Box>
  );
};

export default UploadDropzone;
