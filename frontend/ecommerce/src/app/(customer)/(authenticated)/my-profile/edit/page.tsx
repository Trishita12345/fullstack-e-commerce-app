import {
    Box,
    Button,
    Text
} from "@mantine/core";
import { getUser } from "../actions";
import UpdateProfileForm from "./UpdateProfileForm";
import Link from "next/link";
import { IconArrowNarrowLeft } from "@tabler/icons-react";


const UpdateProfile = async () => {
    const userInfoData = await getUser();
    return (
        <Box maw={500} mx='auto' my={32} px={24}>
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
            <UpdateProfileForm userInfodata={userInfoData} />
        </Box>
    );
};

export default UpdateProfile;
