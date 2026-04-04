import {
    Box,
    Button,
    Divider,
    Text
} from "@mantine/core";
import UpdateProfileForm from "./UpdateProfileForm";
import Link from "next/link";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { Suspense } from "react";
import ProfileFormSkeleton from "./loading";
import { getCurrentUser } from "@/lib/getCurrentUser";

const UpdateProfile = () => {
    return (
        <Suspense fallback={<ProfileFormSkeleton />}>
            <EditContent />
        </Suspense>
    );
}
async function EditContent() {
    const userInfoData = await getCurrentUser();

    return (
        <Box maw={500} mx='auto' mb={12} px={24}>
            <Link href={"/my-profile"}>
                <Button
                    color='black'
                    leftSection={<IconArrowNarrowLeft size={"16px"} />}
                    variant="transparent"
                    style={{ margin: "8px 0px", padding: 0 }}
                >
                    <Text size='xs'>Back to profile details</Text>
                </Button>
            </Link>
            <Text fw={600} style={{ fontFamily: "var(--font-poppins)" }}>Edit Profile Details</Text>
            <Divider mt={8} mb={16} />
            <UpdateProfileForm userInfodata={userInfoData} />
        </Box>
    );
}

// const UpdateProfile = async () => {
//     const userInfoData = await getUserCached();
//     return (
//         <Suspense fallback={<ProfileFormSkeleton />}>
//             <Box maw={500} mx='auto' mb={12} px={24}>
//                 <Link href={"/my-profile"}>
//                     <Button
//                         color='black'
//                         leftSection={<IconArrowNarrowLeft size={"16px"} />}
//                         variant="transparent"
//                         style={{ margin: "8px 0px", padding: 0 }}
//                     >
//                         <Text size='xs'>Back to profile details</Text>
//                     </Button>
//                 </Link>
//                 <Text fw={600} style={{ fontFamily: "var(--font-poppins)" }}>Edit Profile Details</Text>
//                 <Divider mt={8} mb={16} />
//                 <UpdateProfileForm userInfodata={userInfoData} />
//             </Box>
//         </Suspense>
//     );
// };

export default UpdateProfile;
