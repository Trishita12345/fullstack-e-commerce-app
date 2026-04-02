// "use client";
// import { saveUserDTO } from "@/constants/types";
// import { User } from "@/lib/getCurrentUser";
// import { authClient } from "@/lib/auth-client";
// import { useAddressActions } from "@/utils/store/address";
// import { useAuthActions } from "@/utils/store/session";
// import { useEffect } from "react";
// import { saveUser } from "../LoginComponent/actions";
// import { notify } from "@/utils/helperFunctions";

// export function InitialDataLoader() {
//     const { setSession } = useAuthActions();
//     const { data } = authClient.useSession();
//     const { getAllAddresses } = useAddressActions();

//     const saveUserData = async (user: User) => {
//         try {
//             const body: saveUserDTO = {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 emailVerified: user.emailVerified,
//                 image: user.image || '',
//             }
//             await saveUser(body);
//         } catch {
//             notify({
//                 variant: 'error',
//                 title: 'Error!',
//                 message: 'Failed to save user1.'
//             })
//         }
//     }

//     useEffect(() => {
//         if (data?.user) {
//             setSession(data);
//             getAllAddresses();
//             saveUserData(data.user)
//         }
//     }, [data]);

//     return null;
// }               
