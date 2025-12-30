import { VariantAttribute } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import AddEditProductVariantForm from "../AddEditProductVariantForm";

interface PageProps {
  params: {
    productId: string;
  };
}
const AddProductVariant = async ({ params }: PageProps) => {
  const { productId } = await params;
  const variantAttributes = await apiFetch<VariantAttribute[]>(
    `/productItem/${productId}/variant-attributes`
  );
  return (
    <AddEditProductVariantForm
      productId={productId}
      variantAttributes={variantAttributes}
    />
  );
};

export default AddProductVariant;
