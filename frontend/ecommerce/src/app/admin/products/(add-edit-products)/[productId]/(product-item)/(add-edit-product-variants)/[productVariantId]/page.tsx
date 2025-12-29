import { apiFetch } from "@/lib/apiFetch";
import AddEditProductVariantForm from "../AddEditProductVariantForm";
import { ProductVariant } from "@/constants/types";

interface PageProps {
  params: {
    productId: string;
    productVariantId: string;
  };
}
const EditProductVariant = async ({ params }: PageProps) => {
  const { productId, productVariantId } = await params;
  const productVariantData = await apiFetch<ProductVariant>(
    `/productItem/${productId}/${productVariantId}`
  );
  return (
    <AddEditProductVariantForm
      productId={productId}
      productVariantId={productVariantId}
      productVariantData={productVariantData}
    />
  );
};

export default EditProductVariant;
