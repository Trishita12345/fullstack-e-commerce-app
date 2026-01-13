import { SelectOptionType } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import AddEditCategoryForm from "../add-edit-category-form";

const AddCategory = async () => {
  const parentCategories = await apiFetch<SelectOptionType[]>(
    `/product-service/category/get-parent-categories`
  );
  return <AddEditCategoryForm parentCategories={parentCategories} />;
};

export default AddCategory;
