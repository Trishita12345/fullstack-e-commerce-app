import AddEditVariantForm from "../AddEditVariantForm";

interface PageProps {
  params: {
    categoryId: string;
  };
}
const AddVariant = ({ params }: PageProps) => {
  return <AddEditVariantForm categoryId={params.categoryId} />;
};

export default AddVariant;
