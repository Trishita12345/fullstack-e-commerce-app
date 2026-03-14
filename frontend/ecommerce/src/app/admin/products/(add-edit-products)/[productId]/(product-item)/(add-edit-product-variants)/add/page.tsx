import { SelectOptionType, VariantAttribute } from "@/constants/types";
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
    `/product-service/productItem/${productId}/variant-attributes`,
  );
  const gstOptions = await apiFetch<SelectOptionType[]>(
    "/product-service/variant/gst-details",
  );
  return (
    <AddEditProductVariantForm
      productId={productId}
      variantAttributes={variantAttributes}
      gstOptions={gstOptions}
    />
  );
};

export default AddProductVariant;
