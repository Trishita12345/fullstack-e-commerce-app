"use client";

import { Category, SelectOptionType } from "@/constants/types";
import { useApi } from "@/utils/hooks/useApi";
import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";
import { addCategory, editCategory } from "./actions";
import { notify } from "@/utils/helperFunctions";
import { apiFetch } from "@/lib/apiFetch";

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
      parentCategoryId: "",
    },
    validate: {
      name: isNotEmpty("Name cannot be empty"),
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
        variant: "sucess",
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
        <TextInput
          {...form.getInputProps("name")}
          withAsterisk
          label="Name"
          placeholder="Candle, Stick ..."
          key={form.key("name")}
        />
        <Select
          {...form.getInputProps("parentCategoryId")}
          label="Parent Category"
          placeholder="Select Parent Category..."
          key={form.key("parentCategoryId")}
          data={parentCategories as SelectOptionType[]}
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
