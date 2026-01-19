import { AddressDTO } from "@/constants/types";

const AddEditAddressAddressForm = ({
  addressData,
  handleAddAddress,
  handleUpdateAddress,
}: {
  addressData?: AddressDTO;
  handleUpdateAddress: (payload: AddressDTO) => void;
  handleAddAddress: (payload: AddressDTO) => void;
}) => {
  return <>{addressData ? "edit" : "add"}</>;
};

export default AddEditAddressAddressForm;
