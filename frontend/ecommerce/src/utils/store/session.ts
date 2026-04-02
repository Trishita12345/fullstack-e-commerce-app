// import { Session } from "@/lib/getCurrentUser";
// import { create } from "zustand";
// import { persist, devtools } from "zustand/middleware";

// type AuthAction = {
//   setSession: (session: Session | null) => void;
// };

// type AuthState = {
//   session: Session | null;
//   actions: AuthAction;
// };
// const useAuthStore = create<AuthState>()(
//   devtools(persist(
//     (set) => ({
//       session: null,
//       actions: {
//         setSession: (session) => {
//           set({ session });
//         },
//       },
//     }),
//     {
//       name: "auth",
//       partialize: (state) => ({
//         session: state.session,
//       }),
//     },
//   ),
// ));
// export const useAuthActions = () => useAuthStore((state) => state.actions);
// export const useSession = () => useAuthStore((state) => state.session);
