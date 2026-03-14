import { getAllAddressesAction } from "@/app/(customer-checkout)/checkout/addressActions";
import { AddressDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import { Session } from "@/lib/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AddressAction = {
  setSelectedAddressId: (selectedAddressId: string | undefined) => void;
  getAllAddresses: () => Promise<void>;
  clearAddressData: () => void;
};

type AddressState = {
  selectedAddressId: string | undefined;
  actions: AddressAction;
  addresses: AddressDTO[] | undefined;
};
const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      selectedAddressId: undefined,
      addresses: undefined,
      actions: {
        setSelectedAddressId: (selectedAddressId) => {
          set({ selectedAddressId });
        },
        async getAllAddresses() {
          const addresses = await getAllAddressesAction();
          set((state) => ({
            addresses,
            selectedAddressId:
              state.selectedAddressId ||
              (addresses
                ? addresses.find((a) => a.isDefault)?.addressId
                : undefined),
          }));
        },
        clearAddressData() {
          set({ addresses: undefined, selectedAddressId: undefined });
        },
      },
    }),

    {
      name: "addresses",
      partialize: (state) => ({
        selectedAddressId: state.selectedAddressId,
        addresses: state.addresses,
      }),
    },
  ),
);
export const useAddressActions = () =>
  useAddressStore((state) => state.actions);
export const useSelectedAddressId = () =>
  useAddressStore((state) => state.selectedAddressId);

export const useAllAddresses = () =>
  useAddressStore((state) => state.addresses);

export const useSelectedAddress = () =>
  useAddressStore((state) =>
    state.addresses?.find((i) => i.addressId === state.selectedAddressId),
  );
