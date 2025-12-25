import AddEditVariantForm from "../AddEditVariantForm";

interface PageProps {
  params: {
    categoryId: string;
  };
}
const AddVariant = async ({ params }: PageProps) => {
  const { categoryId } = await params;
  return <AddEditVariantForm categoryId={categoryId} />;
};

export default AddVariant;
