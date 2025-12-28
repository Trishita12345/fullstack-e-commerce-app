import { AddEditProductTabs } from "../AddEditProductTabs";

interface PageProps {
  searchParams: {
    tab?: "1" | "2";
  };
  params: {
    productId: string;
  };
}

const EditProduct = async ({ searchParams, params }: PageProps) => {
  const { tab = "1" } = await searchParams;
  const { productId } = await params;
  return <AddEditProductTabs tab={tab} productId={productId} />;
};

export default EditProduct;
