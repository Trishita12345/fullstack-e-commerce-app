"use client";

import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { notify } from "@/utils/helperFunctions";
import type {
  ProductVariant,
  SelectOptionType,
  VariantAttribute,
} from "@/constants/types";
import { ActionButton } from "@/(components)/ActionButton";
import {
  IconArrowNarrowLeft,
  IconCoinRupee,
  IconCurrencyRupee,
  IconFileBarcode,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductImagesSection } from "./ProductImageSection";

interface PageProps {
  productId: string;
  variantAttributes: VariantAttribute[];
  productVariantId?: string;
  productVariantData?: ProductVariant;
}
const AddEditProductVariantForm = ({
  productId,
  productVariantId,
  productVariantData,
  variantAttributes,
}: PageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: productVariantData || {
      sku: "",
      avlStock: 0,
      basePrice: 0,
      discountedPrice: 0,
      imgUrls: [],
      attributes: {},
      // attributes: { UUID1000: "UUID1", UUID1001: "UUID3" },
    },
    validate: {
      sku: isNotEmpty("SKU cannot be empty"),
      basePrice: (value) => (value > 0.0 ? null : "Base Price cannot be zero"),
      discountedPrice: (value, values) =>
        value > 0.0
          ? value <= values.basePrice
            ? null
            : "Discounted Price should be greater than Base Price"
          : "Discounted Price cannot be zero",
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
      console.log("values: ", values);
      if (productVariantId) {
        //await editProductVariant(productId, productVariantId, modifiedValues);
      } else {
        //await addProductVariant(productId, modifiedValues);
      }
      notify({
        variant: "success",
        title: "Success!",
        message: productVariantId
          ? "Product Variant has been updated successfully."
          : "Product Variant has been added successfully.",
      });
      // router.push(`/admin/products/${productId}?tab=2`);
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
      <Link href={`../${productId}?tab=2`}>
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
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack>
              <TextInput
                {...form.getInputProps("sku")}
                withAsterisk
                label="SKU"
                placeholder="ABCD1234..."
                key={form.key("sku")}
                rightSection={<IconFileBarcode />}
              />
              <NumberInput
                {...form.getInputProps("avlStock")}
                allowNegative={false}
                allowDecimal={false}
                withAsterisk
                label="Available Quantity in Stock"
                placeholder="0 to 99999"
                key={form.key("avlStock")}
              />
              <NumberInput
                {...form.getInputProps("basePrice")}
                allowNegative={false}
                decimalScale={2}
                leftSection={<IconCurrencyRupee />}
                withAsterisk
                label="Base Price"
                placeholder="0.01 to 999999.99"
                key={form.key("basePrice")}
              />
              <NumberInput
                {...form.getInputProps("discountedPrice")}
                allowNegative={false}
                decimalScale={2}
                leftSection={<IconCurrencyRupee />}
                withAsterisk
                label="Discounted Price"
                placeholder="0.01 to 999999.99"
                key={form.key("discountedPrice")}
              />
              {variantAttributes.map((va: VariantAttribute) => (
                <Select
                  // disabled={productId !== undefined}
                  {...form.getInputProps(`attributes.${va.variantId}`)}
                  label={va.variantName}
                  placeholder={`Select ${va.variantName}...`}
                  key={form.key(va.variantId)}
                  data={va.attributes as SelectOptionType[]}
                />
              ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ProductImagesSection />
          </Grid.Col>
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
      </form>
    </>
  );
};

export default AddEditProductVariantForm;
