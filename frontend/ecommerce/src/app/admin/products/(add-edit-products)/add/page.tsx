import { AddEditProductTabs } from "../AddEditProductTabs";

interface PageProps {
  searchParams: {
    tab?: "1" | "2";
  };
}

const AddProduct = async ({ searchParams }: PageProps) => {
  return <AddEditProductTabs searchParams={searchParams} />;
};

export default AddProduct;
