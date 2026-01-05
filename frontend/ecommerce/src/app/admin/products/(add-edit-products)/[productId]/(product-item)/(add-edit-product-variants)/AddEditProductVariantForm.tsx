"use client";

import {
  Box,
  Button,
  CopyButton,
  Grid,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  formRootRule,
  FormRulesRecord,
  isNotEmpty,
  useForm,
} from "@mantine/form";
import { useEffect, useState } from "react";
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
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductImagesSection } from "./ProductImageSection";
import {
  addProductVariant,
  editProductVariant,
  generateProductSKU,
} from "./actions";
import { useDisclosure } from "@mantine/hooks";
import { CustomCopyButton } from "@/(components)/CopyButton";

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
  const [visible, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [skuLoading, setSkuLoading] = useState<boolean>(false);
  const [generateSKUButtonDisabled, setGenerateSKUButtonDisabled] =
    useState<boolean>(true);
  const router = useRouter();
  const variantAttributesFormFields = variantAttributes.map((va) => ({
    [`attributes.${va.variantName}`]: isNotEmpty(
      `${va.variantName} cannot be empty`
    ),
  }));
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
      sku: isNotEmpty("Please generate sku first before submitting."),
      basePrice: (value) => (value > 0.0 ? null : "Base Price cannot be zero"),
      discountedPrice: (value, values) =>
        value > 0.0
          ? value <= values.basePrice
            ? null
            : "Discounted Price should be greater than Base Price"
          : "Discounted Price cannot be zero",
      imgUrls: {
        [formRootRule]: (value) => {
          const isThumbnailExist =
            value.filter(({ url, isThumbnail }) => isThumbnail).length == 1;
          const isimagesExist =
            value.filter(({ url, isThumbnail }) => !isThumbnail).length >= 1;
          return isThumbnailExist && isimagesExist
            ? null
            : "Images must be added for each section";
        },
      },
      ...Object.assign({}, ...variantAttributesFormFields),
    },
  });

  const handleVariantAttributeChange = (key: string, value: string | null) => {
    if (value === null) value = "";
    form.setFieldValue(`attributes.${key}`, value);
    const variantNotSelected = variantAttributes.some(
      (va) => !form.getValues().attributes?.[va.variantName]
    );
    setGenerateSKUButtonDisabled(variantNotSelected);
    form.setFieldValue("sku", "");
  };

  const generateSKU = async () => {
    try {
      setSkuLoading(true);
      const value = await generateProductSKU(
        productId,
        form.getValues().attributes
      );
      form.setFieldValue("sku", value);
    } catch {
      notify({
        variant: "error",
        title: "Error",
        message: "Failed to generate SKU",
      });
    } finally {
      setSkuLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (productVariantId) {
        await editProductVariant(productId, productVariantId, values);
      } else {
        await addProductVariant(productId, values);
      }
      notify({
        variant: "success",
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
              {variantAttributes.map((va: VariantAttribute) => (
                <Select
                  withAsterisk
                  {...form.getInputProps(`attributes.${va.variantName}`)}
                  label={va.variantName}
                  placeholder={`Select ${va.variantName}...`}
                  key={form.key(`attributes.${va.variantName}`)}
                  data={
                    va.attributes.map((vaa) => ({
                      label: vaa.label,
                      value: vaa.label,
                    })) as SelectOptionType[]
                  }
                  onChange={(value: string | null) =>
                    handleVariantAttributeChange(va.variantName, value)
                  }
                />
              ))}
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
              <Group>
                {productVariantId ? (
                  <></>
                ) : (
                  <Button
                    variant="light"
                    color="primaryDark.7"
                    size="xs"
                    w={"max-content"}
                    loading={skuLoading}
                    disabled={generateSKUButtonDisabled}
                    leftSection={<IconSparkles />}
                    onClick={generateSKU}
                  >
                    {form.getValues().sku ? "Regenerate SKU" : "Generate SKU"}
                  </Button>
                )}
                {form.getValues().sku && (
                  <Group gap={0}>
                    <Text size="sm" fw={600}>
                      SKU: {form.getValues().sku}
                    </Text>
                    <CustomCopyButton value={form.getValues().sku} />
                  </Group>
                )}
              </Group>
              {!generateSKUButtonDisabled && form.errors.sku && (
                <Text c="red" size="xs">
                  {form.errors.sku}
                </Text>
              )}
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ProductImagesSection
              errors={form.errors}
              withAsterisk
              {...form.getInputProps("imgUrls")}
              visible={visible}
              open={open}
              close={close}
            />
          </Grid.Col>
        </Grid>

        <Group mt="lg">
          <Button
            disabled={skuLoading || visible}
            type="reset"
            color="black.9"
            variant="outline"
            onClick={() => {
              form.reset();
              setGenerateSKUButtonDisabled(true);
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            bg="black.9"
            loading={loading}
            disabled={skuLoading || visible}
          >
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
};

export default AddEditProductVariantForm;
