import { SelectOptionType } from "@/constants/types";
import AddEditVariantForm from "../AddEditVariantForm";
import { apiFetch } from "@/lib/apiFetch";

interface PageProps {
  params: {
    categoryId: string;
  };
}
const AddVariant = async ({ params }: PageProps) => {
  const { categoryId } = await params;
    const categoryOptions = await apiFetch<SelectOptionType[]>(
        "/category/get-all-categories"
      );
  return <AddEditVariantForm categoryId={categoryId} categoryOptions={categoryOptions}/>;
};

export default AddVariant;
