import { serverApiFetch } from "@/lib/serverApiFetch";
import { SelectOptionType } from "@/constants/types";
import AddEditVariantForm from "@/app/admin/categories/(add-edit-category)/[categoryId]/variants/(add-edit-variants)/AddEditVariantForm";

const AddVariant = async () => {
  const categoryOptions = await serverApiFetch<SelectOptionType[]>(
    "/product-service/category/get-all-categories"
  );
  return <AddEditVariantForm categoryOptions={categoryOptions} />;
};

export default AddVariant;
