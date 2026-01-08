"use client";

import {
  AddEditCategoryResponceType,
  Category,
  SelectOptionType,
} from "@/constants/types";
import { useApi } from "@/utils/hooks/useApi";
import {
  Button,
  Grid,
  GridCol,
  Group,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";
import { addCategory, editCategory } from "./actions";
import { notify } from "@/utils/helperFunctions";
import { apiFetch } from "@/lib/apiFetch";
import { CustomRichTextEditor } from "@/(components)/CustomRichTextEditor";
import UploadDropzone from "@/(components)/UploadDropzone";
import Link from "next/link";
import { ActionButton } from "@/(components)/ActionButton";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";

const AddEditCategoryForm = ({
  categoryId,
  categoryData,
  parentCategories,
}: {
  parentCategories: SelectOptionType[];
  categoryId?: string;
  categoryData?: AddEditCategoryResponceType;
}) => {
  const router = useRouter();
  const [visible, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: categoryData || {
      name: "",
      description: "<p></p>",
      imgUrl: "",
      parentCategoryId: "",
    },
    validate: {
      name: isNotEmpty("Name cannot be empty"),
      imgUrl: isNotEmpty("Image cannot be empty"),
    },
  });
  const handleSubmit = async (values: AddEditCategoryResponceType) => {
    try {
      setLoading(true);
      console.log("values: ", values);
      if (categoryId) {
        await editCategory(categoryId, values);
      } else {
        await addCategory(values);
      }
      router.push(`/admin/categories/`);
      notify({
        variant: "success",
        title: "Success!",
        message: categoryId
          ? "Category has been updated successfully."
          : "Category has been added successfully.",
      });
    } catch (err: any) {
      notify({
        variant: "error",
        title: "Opps!",
        message: categoryId
          ? "Failed to update category."
          : "Failed to add category.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Link href={"../categories"}>
        <ActionButton
          Icon={<IconArrowNarrowLeft size={"16px"} />}
          label="Back to Categories"
          variant="transparent"
          style={{ marginTop: "8px", padding: 0 }}
        />
      </Link>
      <h2>{categoryId ? "Update Category" : "Create Category"}</h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <Grid>
            <GridCol span={{ base: 12, sm: 6 }}>
              <TextInput
                {...form.getInputProps("name")}
                withAsterisk
                label="Name"
                placeholder="Candle, Stick ..."
                key={form.key("name")}
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }}>
              <Select
                {...form.getInputProps("parentCategoryId")}
                label="Parent Category"
                placeholder="Select Parent Category..."
                key={form.key("parentCategoryId")}
                data={parentCategories as SelectOptionType[]}
              />
            </GridCol>
          </Grid>
          <Grid>
            <GridCol span={{ base: 12, sm: 6 }}>
              <CustomRichTextEditor
                label="Description"
                {...form.getInputProps("description")}
                key={form.key("description")}
                errors={form.errors}
                field="description"
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }}>
              <UploadDropzone
                label="Image"
                {...form.getInputProps("imgUrl")}
                key={form.key("imgUrl")}
                errors={form.errors}
                field="imgUrl"
                visible={visible}
                open={open}
                close={close}
                withAsterisk
              />
            </GridCol>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button
              type="reset"
              color="black.9"
              variant="outline"
              onClick={form.reset}
              disabled={visible}
            >
              Reset
            </Button>
            <Button
              type="submit"
              bg="black.9"
              loading={loading}
              disabled={visible}
            >
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default AddEditCategoryForm;
