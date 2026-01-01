import { ActionButton } from "@/(components)/ActionButton";
import { ListPageClient } from "@/(components)/adminListPage";
import { SortableField } from "@/(components)/adminListPage/SortButton";
import { FilterButton } from "@/(components)/FilterButton";
import ResponsiveImage from "@/(components)/responsiveImage";
import { Page, ProductItemListing, VariantAttribute } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { formattedPrice } from "@/utils/helperFunctions";
import { Badge, Group, Text } from "@mantine/core";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { router } from "better-auth/api";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import DeleteProductItem from "./DeleteProductItem";

interface PageProps {
  productId: string;
  searchParams: {
    tab?: "1" | "2";
    page?: string;
    sortBy?: string;
    direction?: string;
    query?: string;
    f?: string;
  };
}
const ProductVariantsListing = async ({
  productId,
  searchParams,
}: PageProps) => {
  const {
    page: pageParam,
    sortBy = "updatedAt",
    direction = "desc",
    query = "",
    f=""
  } = await searchParams;
  const page = Number(pageParam ?? 1) - 1;
  const sortableFields = [{
      field: "discountedPrice",
      label: "Price",
      type: "number",
  },
  {
      field: "availableStock",
      label: "Available Stock",
      type: "number",
  }, {
      field: "updatedAt",
      label: "Updated At",
      type: "date",
  }] as SortableField[];
  
  console.log('aaaaa: ',`query=${query}&page=${page}&sortBy=${sortBy}&direction=${direction}&filter=${f}`)
  const products = await apiFetch<Page<ProductItemListing>>(
    `/productItem/${productId}/page?query=${query}&page=${page}&sortBy=${sortBy}&direction=${direction}&filter=${f}`,
    {
      cache: "force-cache",
      revalidate: 60,
    }
  );
  const variantAttributes = await apiFetch<VariantAttribute[]>(
      `/productItem/${productId}/variant-attributes`
  );
  
  return (
    <ListPageClient
      title={`Product Items`}
      otherButtons={
        <FilterButton
          fields={
            variantAttributes.map((va) => (
              {
                label: va.variantName,
                options: va.attributes.map((o) => ({
                  label: o.label,
                  value: o.label,
                })),
                type: "multiSelect",
                field: va.variantName,
              }
            ))
          }
        />
      }
      addButton={
        <Link href={`/admin/products/${productId}/add`}>
          <ActionButton
            Icon={<IconPlus size={"16px"} />}
            label="Create Product Variants"
            variant="filled"
            c="white"
            size="xs"
          />
        </Link>
      }
      pageData={products}
      fields={sortableFields}
      tableContent={{
        head: ["", "SKU", "Available Stock", "Price", "Attributes", "Actions"],
        body: products.content.map((item: ProductItemListing) => [
          <>{ item.imgUrl && <ResponsiveImage src={item.imgUrl} height={60} width={45} key={item.productItemId} /> }</>,
          item.sku,
          item.avlStock,
          <Group gap={4}>
            {item.discountedPrice !== item.basePrice && <Text size="xs" td={'line-through'} c='dimmed'>
              {formattedPrice(item.basePrice)}</Text>}
            <Text size="sm" fw={500}>{formattedPrice(item.discountedPrice)}</Text>
          </Group>,
          <Group gap={4}>{item.attributes.length > 0 ?
            item.attributes.map((i: string) => (
              <Badge key={i+item.productItemId} variant="gradient" gradient={{ from: 'primaryDark.6', to: 'primary.3', deg: 150 }}>{i}</Badge>
            ))
            : "-"}
          </Group>,
          <Group gap={4}>
            <Link href={`/admin/products/${productId}/${item.productItemId}`}>
            <ActionButton
              Icon={<IconEdit size={"16px"} />}
              label={<u>Edit</u>}
              variant="transparent"
            />
            </Link>
            {/* <DeleteProductItem productItemId={item.productItemId} productId={ productId} /> */}
          </Group>,
        ]),
      }}
    />
  );
};

export default ProductVariantsListing;
