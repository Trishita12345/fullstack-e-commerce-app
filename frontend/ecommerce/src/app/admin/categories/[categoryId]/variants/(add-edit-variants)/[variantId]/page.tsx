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
    `/variant/${variantId}`
  );
  return (
    <AddEditVariantForm
      categoryId={categoryId}
      variantId={variantId}
      variantData={{...variantData, category: categoryId}}
      categoryOptions={[] as SelectOptionType[]}
    />
  );
};

export default EditVariant;
