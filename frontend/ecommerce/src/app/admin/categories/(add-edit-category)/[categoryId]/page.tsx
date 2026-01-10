import {
  SelectOptionType,
  AddEditCategoryResponseType,
} from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import AddEditCategoryForm from "../add-edit-category-form";

interface PageProps {
  params: {
    categoryId: string;
  };
}

const EditCategory = async ({ params }: PageProps) => {
  const { categoryId } = await params;
  const categoryData = await apiFetch<AddEditCategoryResponseType>(
    `/category/${categoryId}`
  );
  const parentCategories = await apiFetch<SelectOptionType[]>(
    `/category/get-parent-categories`
  );
  console.log("categoryData: ", categoryData);
  const filteredParentCategories = parentCategories.filter(
    (res: SelectOptionType) => res.value !== categoryId
  );
  return (
    <AddEditCategoryForm
      parentCategories={filteredParentCategories}
      categoryData={categoryData}
      categoryId={categoryId}
    />
  );
};

export default EditCategory;
