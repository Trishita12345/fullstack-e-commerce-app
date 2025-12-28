"use client";

import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { notify } from "@/utils/helperFunctions";
import type { Variant, VariantAttribute } from "@/constants/types";
import { ActionButton } from "@/(components)/ActionButton";
import { IconArrowNarrowLeft, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { randomId } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { addVariant, editVariant } from "./actions";

interface PageProps {
  categoryId: string;
  variantId?: string;
  variantData?: Variant;
}
const AddEditVariantForm = ({
  categoryId,
  variantId,
  variantData,
}: PageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: variantData || {
      name: "",
      attributes: [] as VariantAttribute[],
    },
    validate: {
      name: isNotEmpty("Variant Name cannot be empty"),
      attributes: {
        name: isNotEmpty("Attribute Name cannot be empty"),
      },
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (values.attributes.length < 1) {
        notify({
          variant: "error",
          title: "Error!",
          message: "You need to add at least one attribute for this variant",
        });
        return;
      }
      const modifiedValues = {
        ...values,
        attributes: values.attributes.map((a: VariantAttribute) =>
          a.id.startsWith("added-") ? { name: a.name } : { ...a }
        ),
      };
      if (variantId) {
        await editVariant(categoryId, variantId, modifiedValues);
      } else {
        await addVariant(categoryId, modifiedValues);
      }
      notify({
        variant: "sucess",
        title: "Success!",
        message: variantId
          ? "Variant has been updated successfully."
          : "Variant has been added successfully.",
      });
      router.push(`/admin/categories/${categoryId}/variants`);
    } catch (err: any) {
      notify({
        variant: "error",
        title: "Opps!",
        message: variantId
          ? "Failed to update variant."
          : "Failed to add variant.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fields = form
    .getValues()
    .attributes.map((item: VariantAttribute, index) => (
      <Group key={item.id}>
        <TextInput
          placeholder="200ml, 400ml..."
          withAsterisk
          style={{ flex: 1 }}
          key={form.key(`attributes.${index}.name`)}
          {...form.getInputProps(`attributes.${index}.name`)}
        />
        <ActionIcon
          onClick={() => form.removeListItem("attributes", index)}
          c="red"
          bg="red.1"
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    ));
  return (
    <>
      <Link href={"../variants"}>
        <ActionButton
          Icon={<IconArrowNarrowLeft size={"16px"} />}
          label="Back to Variants"
          variant="transparent"
          style={{ marginTop: "8px", padding: 0 }}
        />
      </Link>
      <h2>{variantId ? "Update Variant" : "Create Variant"}</h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <TextInput
            {...form.getInputProps("name")}
            withAsterisk
            label="Name"
            placeholder="Size, Fragrance..."
            key={form.key("name")}
          />
          <Box>
            <Text size="xl" fw={900} mb={"xs"}>
              Manage attributes
            </Text>
            <Divider />
          </Box>
          <Stack w={{ base: "100%", md: "60%", lg: "40%" }}>
            {fields.length > 0 ? (
              fields
            ) : (
              <Text c="dimmed">No attributes added for this variant...</Text>
            )}
            <ActionButton
              style={{ width: "max-content" }}
              Icon={<IconPlus size={16} />}
              label="Add new attribute"
              onClick={() =>
                form.insertListItem("attributes", {
                  name: "",
                  id: `added-${randomId()}`,
                })
              }
            />
          </Stack>
          <Group mt="lg">
            <Button
              type="reset"
              color="black.9"
              variant="outline"
              onClick={form.reset}
            >
              Reset
            </Button>
            <Button type="submit" bg="black.9" loading={loading}>
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default AddEditVariantForm;
