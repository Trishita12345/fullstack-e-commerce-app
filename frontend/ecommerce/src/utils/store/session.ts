import { Session } from "@/lib/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthAction = {
  setSession: (session: Session | null) => void;
};

type AuthState = {
  session: Session | null;
  actions: AuthAction;
};
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      actions: {
        setSession: (session) => {
          set({ session });
        },
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        session: state.session,
      }),
    },
  ),
);
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useSession = () => useAuthStore((state) => state.session);
