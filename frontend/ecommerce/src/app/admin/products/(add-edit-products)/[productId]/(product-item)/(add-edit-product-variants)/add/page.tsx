import { SelectOptionType, VariantAttribute } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import AddEditProductVariantForm from "../AddEditProductVariantForm";

interface PageProps {
  params: {
    productId: string;
  };
}
const AddProductVariant = async ({ params }: PageProps) => {
  const { productId } = await params;
  const variantAttributes = await serverApiFetch<VariantAttribute[]>(
    `/product-service/productItem/${productId}/variant-attributes`,
  );
  const gstOptions = await serverApiFetch<SelectOptionType[]>(
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
