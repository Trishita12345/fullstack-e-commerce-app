import { AddEditProductTabs } from "../AddEditProductTabs";

interface PageProps {
  searchParams: {
    tab?: "1" | "2";
  };
}

const AddProduct = async ({ searchParams }: PageProps) => {
  const { tab = "1" } = await searchParams;

  return <AddEditProductTabs tab={tab} />;
};

export default AddProduct;
