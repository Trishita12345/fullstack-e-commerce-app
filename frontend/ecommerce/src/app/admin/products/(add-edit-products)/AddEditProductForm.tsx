"use client";

import {
  Stack,
  TextInput,
  Group,
  Button,
  Select,
  Grid,
  GridCol,
} from "@mantine/core";
import type { Product, SelectOptionType } from "@/constants/types";
import { useForm, isNotEmpty } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notify } from "@/utils/helperFunctions";
import { addProduct, editProduct } from "./actions";
import { CustomRichTextEditor } from "@/(components)/CustomRichTextEditor";

interface PageProps {
  productId?: string;
  productData?: Product;
  categories: SelectOptionType[];
}

const AddEditProductForm = ({
  productId,
  productData,
  categories,
}: PageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: productData || {
      productName: "",
      description: "<p></p>",
      feature: "<p></p>",
      categoryId: "",
    },
    validate: {
      productName: isNotEmpty("Product name cannot be empty"),
      categoryId: isNotEmpty("Category cannot be empty"),
    },
  });

  const handleSubmit = async (values: Product) => {
    try {
      setLoading(true);
      let newProductId = productId;
      if (productId) {
        await editProduct(productId, values);
      } else {
        newProductId = await addProduct(values);
      }
      notify({
        variant: "success",
        title: "Success!",
        message: productId
          ? "Product has been updated successfully."
          : "Product has been added successfully.",
      });
      if (productId) return;
      router.push(`/admin/products/${newProductId}?tab=2`);
    } catch {
      notify({
        variant: "error",
        title: "Opps!",
        message: productId
          ? "Failed to update product."
          : "Failed to add product.",
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
              {...form.getInputProps("productName")}
              withAsterisk
              label="Name"
              placeholder="Size, Fragrance..."
              key={form.key("productName")}
            />
          </GridCol>
          <GridCol span={{ base: 12, sm: 6 }}>
            <Select
              withAsterisk
              disabled={productId !== undefined}
              {...form.getInputProps("categoryId")}
              label="Category"
              placeholder="Select Category..."
              key={form.key("categoryId")}
              data={categories as SelectOptionType[]}
            />
          </GridCol>
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
            <CustomRichTextEditor
              label="Features"
              {...form.getInputProps("feature")}
              key={form.key("feature")}
              errors={form.errors}
              field="feature"
            />
          </GridCol>
        </Grid>
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
  );
};

export default AddEditProductForm;
