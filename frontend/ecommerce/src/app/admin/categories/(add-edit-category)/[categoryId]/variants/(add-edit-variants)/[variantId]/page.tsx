import { apiFetch } from "@/lib/apiFetch";
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
  const variantData = await apiFetch<Variant>(
    `/product-service/variant/${variantId}`
  );
  const categoryOptions = await apiFetch<SelectOptionType[]>(
    `/product-service/category/${categoryId}/ancestors`
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
