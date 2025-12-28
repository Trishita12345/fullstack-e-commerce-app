import { ActionButton } from "@/(components)/ActionButton";
import { Product, SelectOptionType } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import AddEditVariantForm from "./AddEditProductForm";

interface PageProps {
  tab: "1" | "2";
  productId?: string;
}

export async function AddEditProductTabs({ tab, productId }: PageProps) {
  const categories = await apiFetch<SelectOptionType[]>(
    "/category/get-leaf-categories"
  );
  let productData;
  if (productId) productData = await apiFetch<Product>(`/product/${productId}`);
  return (
    <>
      <Link href={"../products"}>
        <ActionButton
          Icon={<IconArrowNarrowLeft size={"16px"} />}
          label="Back to Products"
          variant="transparent"
          style={{ marginTop: "8px", padding: 0 }}
        />
      </Link>
      <h2>{productId ? "Update Product" : "Create Product"}</h2>

      <Tabs
        color="primaryDark.7"
        defaultValue={productId === undefined ? "1" : tab}
      >
        <TabsList>
          <TabsTab value="1">Product Details</TabsTab>
          <TabsTab value="2" disabled={productId === undefined}>
            Product Items
          </TabsTab>
        </TabsList>

        <TabsPanel value="1" pt="xs">
          <AddEditVariantForm
            categories={categories}
            productData={productData}
            productId={productId}
          />
        </TabsPanel>

        <TabsPanel value="2" pt="xs">
          Second tab color is blue, it gets this value from props, props have
          the priority and will override context value
        </TabsPanel>
      </Tabs>
    </>
  );
}
