import { SelectOptionType } from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import AddEditCategoryForm from "../add-edit-category-form";

const AddCategory = async () => {
  const parentCategories = await serverApiFetch<SelectOptionType[]>(
    `/product-service/category/get-parent-categories`
  );
  return <AddEditCategoryForm parentCategories={parentCategories} />;
};

export default AddCategory;
