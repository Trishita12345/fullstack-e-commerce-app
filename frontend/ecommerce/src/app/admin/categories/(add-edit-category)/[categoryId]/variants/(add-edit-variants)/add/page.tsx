import { SelectOptionType } from "@/constants/types";
import AddEditVariantForm from "../AddEditVariantForm";
import { serverApiFetch } from "@/lib/serverApiFetch";

interface PageProps {
  params: {
    categoryId: string;
  };
}
const AddVariant = async ({ params }: PageProps) => {
  const { categoryId } = await params;
  const categoryOptions = await serverApiFetch<SelectOptionType[]>(
    "/product-service/category/get-all-categories"
  );
  return (
    <AddEditVariantForm
      categoryId={categoryId}
      categoryOptions={categoryOptions}
    />
  );
};

export default AddVariant;
