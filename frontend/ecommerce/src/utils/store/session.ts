import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { notifications } from "@mantine/notifications";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthAction = {
    // login: () => Promise<void>;
    // logout: () => void;
    setSession: (session: Session | null) => void;
}

type AuthState = {
    session: Session | null,
    actions: AuthAction
}
const useAuthStore = create<AuthState>()(
    persist((set) => ({
        session: null,
        actions: {
            // login: async () => {
            //     debugger;
            //     const { error } = await authClient.signIn.social({
            //         provider: "google",
            //     });
            //     if (error) {
            //         notifications.show({
            //             title: "Login Failed",
            //             message: error.message,
            //             color: "red",
            //         });
            //     }
            //     const { data } = authClient.useSession();
            //     debugger;
            //     set({ session: data })
            // },
            setSession: (session) => {
                set({ session })
            },
            // logout: async () => {
            //     await authClient.signOut();
            //     set({ session: null })
            // }
        }

    }),
        {
            name: "auth",
            partialize: (state) => ({
                session: state.session,
            }),
        }
    )
)
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useSession = () => useAuthStore(state => state.session);