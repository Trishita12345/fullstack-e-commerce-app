import { serverApiFetch } from "@/lib/serverApiFetch";
import AddEditProductVariantForm from "../AddEditProductVariantForm";
import {
  ProductVariant,
  SelectOptionType,
  VariantAttribute,
} from "@/constants/types";

interface PageProps {
  params: { productId: string; productVariantId: string };
}
const EditProductVariant = async ({ params }: PageProps) => {
  const { productId, productVariantId } = await params;
  const productVariantData = await serverApiFetch<ProductVariant>(
    `/product-service/productItem/${productVariantId}`,
  );
  const variantAttributes = await serverApiFetch<VariantAttribute[]>(
    `/product-service/productItem/${productId}/variant-attributes`,
  );
  const gstOptions = await serverApiFetch<SelectOptionType[]>(
    "/product-service/variant/gst-details",
  );
  console.log("GST Options: ", gstOptions);
  return (
    <AddEditProductVariantForm
      productId={productId}
      productVariantId={productVariantId}
      productVariantData={productVariantData}
      variantAttributes={variantAttributes}
      gstOptions={gstOptions}
    />
  );
};

export default EditProductVariant;
