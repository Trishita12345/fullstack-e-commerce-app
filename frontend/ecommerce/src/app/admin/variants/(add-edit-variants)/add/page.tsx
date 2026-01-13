import { apiFetch } from "@/lib/apiFetch";
import { SelectOptionType } from "@/constants/types";
import AddEditVariantForm from "@/app/admin/categories/(add-edit-category)/[categoryId]/variants/(add-edit-variants)/AddEditVariantForm";

const AddVariant = async () => {
  const categoryOptions = await apiFetch<SelectOptionType[]>(
    "/product-service/category/get-all-categories"
  );
  return <AddEditVariantForm categoryOptions={categoryOptions} />;
};

export default AddVariant;
