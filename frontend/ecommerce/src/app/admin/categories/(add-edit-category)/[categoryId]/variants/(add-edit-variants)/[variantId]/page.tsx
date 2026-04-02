import { serverApiFetch } from "@/lib/serverApiFetch";
import AddEditVariantForm from "../AddEditVariantForm";
import type { SelectOptionType, Variant } from "@/constants/types";

interface PageProps {
  params: {
    categoryId: string;
    variantId: string;
  };
}
const EditVariant = async ({ params }: PageProps) => {
  const { categoryId, variantId } = await params;
  const variantData = await serverApiFetch<Variant>(
    `/product-service/variant/${variantId}`,
  );
  const categoryOptions = await serverApiFetch<SelectOptionType[]>(
    `/product-service/category/${categoryId}/ancestors`,
  );
  return (
    <AddEditVariantForm
      categoryId={categoryId}
      variantId={variantId}
      variantData={{ ...variantData, category: categoryId }}
      categoryOptions={categoryOptions}
    />
  );
};

export default EditVariant;
