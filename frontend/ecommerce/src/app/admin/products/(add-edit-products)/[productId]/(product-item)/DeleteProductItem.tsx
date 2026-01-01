"use client"
import { ActionButton } from "@/(components)/ActionButton";
import { notify } from "@/utils/helperFunctions";
import { Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { deleteProductVariant } from "./(add-edit-product-variants)/actions";

const DeleteProductItem = ({ productItemId }: { productItemId: string, productId: string }) => {
  const deleteHandle = async (productItemId: string) => {
    try {
      await deleteProductVariant(productItemId);
      notify({
        variant: "success",
        title: "Success!",
        message: "Product Variant has been deleted successfully."
      });
    } catch (err: any) {
      notify({
        variant: "error",
        title: "Opps!",
        message: "Failed to delete product variant."
      });
    } 
  }

  return (
    <>
      <ActionButton
        type="submit"
        Icon={<IconTrash size={"16px"} color="red"/>}
        label={<Text c="red" td="underline">Delete</Text>}
        variant="transparent"
        onClick={()=>deleteHandle(productItemId)}
      />
      </>
    );
}
 
export default DeleteProductItem;