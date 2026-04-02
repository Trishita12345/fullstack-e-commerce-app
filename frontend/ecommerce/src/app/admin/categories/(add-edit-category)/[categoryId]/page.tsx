import {
  SelectOptionType,
  AddEditCategoryResponseType,
} from "@/constants/types";
import { serverApiFetch } from "@/lib/serverApiFetch";
import AddEditCategoryForm from "../add-edit-category-form";

interface PageProps {
  params: {
    categoryId: string;
  };
}

const EditCategory = async ({ params }: PageProps) => {
  const { categoryId } = await params;
  const categoryData = await serverApiFetch<AddEditCategoryResponseType>(
    `/product-service/category/${categoryId}`
  );
  const parentCategories = await serverApiFetch<SelectOptionType[]>(
    `/product-service/category/get-parent-categories`
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
