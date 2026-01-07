"use client";

import { Category, SelectOptionType } from "@/constants/types";
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

const AddEditCategoryForm = ({
  popUpClose,
  id,
}: {
  popUpClose: () => void;
  id?: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [parentCategories, setParentCategories] = useState<SelectOptionType[]>(
    []
  );

  const getParentCategories = useCallback(async (id: string | undefined) => {
    const response = await apiFetch<SelectOptionType[]>(
      "/category/get-parent-categories"
    );
    if (id) {
      setParentCategories(
        response.filter((res: SelectOptionType) => res.value !== id)
      );
    } else {
      setParentCategories(response);
    }
  }, []);

  const getCategoryById = useCallback(async (id: string) => {
    const response = await apiFetch<any>(`/category/${id}`);
    form.setValues({
      name: response.name,
      parentCategoryId: response.parentCategory?.value ?? "",
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          getParentCategories(id),
          id ? getCategoryById(id) : Promise.resolve(),
        ]);
      } catch (err) {
        notify({
          variant: "error",
          title: "Oops!",
          message: "Failed to fetch data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, getParentCategories, getCategoryById]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
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

  const handleSubmit = async (values: Category) => {
    try {
      setLoading(true);
      if (id) {
        await editCategory(id, values);
      } else {
        await addCategory(values);
      }
      popUpClose();
      notify({
        variant: "success",
        title: "Success!",
        message: id
          ? "Category has been updated successfully."
          : "Category has been added successfully.",
      });
    } catch (err: any) {
      notify({
        variant: "error",
        title: "Opps!",
        message: id ? "Failed to update category." : "Failed to add category.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
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

        <UploadDropzone
          label="Image"
          {...form.getInputProps("imgUrl")}
          key={form.key("imgUrl")}
          errors={form.errors}
          field="imgUrl"
        />
        <CustomRichTextEditor
          label="Description"
          {...form.getInputProps("description")}
          key={form.key("description")}
          errors={form.errors}
          field="description"
        />
        <Group justify="flex-end" mt="md">
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
  );
};

export default AddEditCategoryForm;
