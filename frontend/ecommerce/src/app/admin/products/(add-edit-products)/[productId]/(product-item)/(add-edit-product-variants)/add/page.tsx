import AddEditProductVariantForm from "../AddEditProductVariantForm";

interface PageProps {
  params: {
    productId: string;
  };
}
const AddProductVariant = async ({ params }: PageProps) => {
  const { productId } = await params;
  return <AddEditProductVariantForm productId={productId} />;
};

export default AddProductVariant;
