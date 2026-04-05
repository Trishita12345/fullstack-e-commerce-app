import { rolePermissionResponse, User } from "@/constants/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type AuthAction = {
  setUserInfo: (userInfo?: User) => void;
  setAccess: (access?: rolePermissionResponse) => void;
};

type AuthState = {
  access: rolePermissionResponse | undefined;
  userInfo: User | undefined
  actions: AuthAction;
};
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      access: undefined,
      userInfo: undefined,
      actions: {
        setUserInfo: (userInfo?: User) => {
          set({ userInfo });
        },
        setAccess: (access?: rolePermissionResponse) => {
          set({ access });
        },
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        access: state.access,
        userInfo: state.userInfo,
      }),
    },
  )

);
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useAccess = () => useAuthStore((state) => state.access);
export const useIsLoggedIn = () => useAuthStore((state) => state.userInfo !== undefined);
export const useUserInfo = () => useAuthStore((state) => state.userInfo);
