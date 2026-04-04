import { rolePermissionResponse } from "@/constants/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type AuthAction = {
  setAccess: (access: rolePermissionResponse) => void;
};

type AuthState = {
    access: rolePermissionResponse|undefined;
    actions: AuthAction;
};
const useAuthStore = create<AuthState>()(
    persist(
    (set) => ({
          access: undefined,
      actions: {
        setAccess: (access: rolePermissionResponse) => {
          set({ access });
        },
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        access: state.access,
      }),
    },
    )
  
);
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useAccess = () => useAuthStore((state) => state.access);
