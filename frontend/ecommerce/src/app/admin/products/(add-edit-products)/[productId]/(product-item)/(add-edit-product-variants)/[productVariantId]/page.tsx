import { apiFetch } from "@/lib/apiFetch";
import AddEditProductVariantForm from "../AddEditProductVariantForm";
import { ProductVariant, VariantAttribute } from "@/constants/types";

interface PageProps {
  params: { productId: string; productVariantId: string };
}
const EditProductVariant = async ({ params }: PageProps) => {
  const { productId, productVariantId } = await params;
  const productVariantData = await apiFetch<ProductVariant>(
    `/product-service/productItem/${productVariantId}`
  );
  const variantAttributes = await apiFetch<VariantAttribute[]>(
    `/product-service/productItem/${productId}/variant-attributes`
  );
  return (
    <AddEditProductVariantForm
      productId={productId}
      productVariantId={productVariantId}
      productVariantData={productVariantData}
      variantAttributes={variantAttributes}
    />
  );
};

export default EditProductVariant;
