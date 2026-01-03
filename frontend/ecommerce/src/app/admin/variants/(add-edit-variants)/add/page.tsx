import { apiFetch } from "@/lib/apiFetch";
import { SelectOptionType } from "@/constants/types";
import AddEditVariantForm from "@/app/admin/categories/[categoryId]/variants/(add-edit-variants)/AddEditVariantForm";

const AddVariant = async () => {
  const categoryOptions = await apiFetch<SelectOptionType[]>(
      "/category/get-all-categories"
    );
  return <AddEditVariantForm categoryOptions={categoryOptions} />;
};

export default AddVariant;
