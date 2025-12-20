"use client";

import { Category, SelectOptionType } from "@/constants/types";
import { useApi } from "@/utils/hooks/useApi";
import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { addCategory } from "./actions";
import { notify } from "@/utils/helperFunctions";

const CreateCategoryForm = ({ popUpClose }: { popUpClose: () => void }) => {
  const [pending, setPending] = useState<boolean>(false);
  const {
    data: parentCaregories,
    error: parentCategoryFetchError,
    execute,
  } = useApi<SelectOptionType[]>();
  const getParentCategories = async () => {
    await execute("/category/get-parent-categories");
  };

  useEffect(() => {
    getParentCategories();
  }, []);

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
      setPending(true);
      await addCategory(values);
      popUpClose();
      notify({
        variant: "sucess",
        title: "Success!",
        message: "Category has been added successfully.",
      });
    } catch (err: any) {
      notify({
        variant: "error",
        title: "Opps!",
        message: "Failed to add category.",
      });
    } finally {
      setPending(false);
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
          data={parentCaregories as SelectOptionType[]}
          error={
            parentCategoryFetchError !== null
              ? "Failed to fetch parent categories"
              : null
          }
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
          <Button type="submit" bg="black.9" loading={pending}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CreateCategoryForm;
