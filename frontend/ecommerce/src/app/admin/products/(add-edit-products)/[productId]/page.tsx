import { AddEditProductTabs } from "../AddEditProductTabs";

interface PageProps {
  searchParams: {
    tab?: "1" | "2";
    page?: string;
    sortBy?: string;
    direction?: string;
    query?: string;
  };
  params: {
    productId: string;
  };
}

const EditProduct = async ({ searchParams, params }: PageProps) => {
  const { productId } = await params;
  return (
    <AddEditProductTabs productId={productId} searchParams={searchParams} />
  );
};

export default EditProduct;
