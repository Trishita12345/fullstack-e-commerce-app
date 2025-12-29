"use client";

import { Button, Group, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { notify } from "@/utils/helperFunctions";
import type { ProductVariant } from "@/constants/types";
import { ActionButton } from "@/(components)/ActionButton";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageProps {
  productId: string;
  productVariantId?: string;
  productVariantData?: ProductVariant;
}
const AddEditProductVariantForm = ({
  productId,
  productVariantId,
  productVariantData,
}: PageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: productVariantData || {
      sku: "",
    },
    validate: {
      sku: isNotEmpty("SKU cannot be empty"),
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      //   if (values.attributes.length < 1) {
      //     notify({
      //       variant: "error",
      //       title: "Error!",
      //       message: "You need to add at least one attribute for this variant",
      //     });
      //     return;
      //   }
      const modifiedValues = {
        ...values,
      };
      if (productVariantId) {
        //await editProductVariant(productId, productVariantId, modifiedValues);
      } else {
        //await addProductVariant(productId, modifiedValues);
      }
      notify({
        variant: "sucess",
        title: "Success!",
        message: productVariantId
          ? "Product Variant has been updated successfully."
          : "Product Variant has been added successfully.",
      });
      router.push(`/admin/products/${productId}?tab=2`);
    } catch (err: any) {
      notify({
        variant: "error",
        title: "Opps!",
        message: productVariantId
          ? "Failed to update product variant."
          : "Failed to add product variant.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link href={`../products/${productId}?tab=2`}>
        <ActionButton
          Icon={<IconArrowNarrowLeft size={"16px"} />}
          label="Back to Product Variants"
          variant="transparent"
          style={{ marginTop: "8px", padding: 0 }}
        />
      </Link>
      <h2>
        {productVariantId ? "Update Product Variant" : "Create Product Variant"}
      </h2>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <TextInput
            {...form.getInputProps("sku")}
            withAsterisk
            label="SKU"
            placeholder="ABCD1234..."
            key={form.key("sku")}
          />

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

export default AddEditProductVariantForm;
