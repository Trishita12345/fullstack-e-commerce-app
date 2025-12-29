import { VariantAttribute } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import AddEditProductVariantForm from "../AddEditProductVariantForm";

interface PageProps {
  params: {
    productId: string;
  };
}
const AddProductVariant = async ({ params }: PageProps) => {
  const { productId } = await params;
  const variantAttributes: VariantAttribute[] = [
    {
      variantId: "UUID1000",
      variantName: "Size",
      attributes: [
        { value: "UUID1", label: "200ml" },
        { value: "UUID2", label: "400ml" },
      ],
    },
    {
      variantId: "UUID1001",
      variantName: "Frangrance",
      attributes: [
        { value: "UUID3", label: "Rose" },
        { value: "UUID4", label: "Lavender" },
      ],
    },
  ];

  //   await apiFetch<VariantAttribute[]>(
  //   `/productItem/${productId}/variant-attributes`
  // );
  return (
    <AddEditProductVariantForm
      productId={productId}
      variantAttributes={variantAttributes}
    />
  );
};

export default AddProductVariant;
