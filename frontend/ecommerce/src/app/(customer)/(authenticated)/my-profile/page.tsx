import { getServerSession, getServerToken } from "@/lib/get-server-auth";
import { Avatar, Box, Center, Divider, Stack, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { forbidden } from "next/navigation";
import "./profile.css"

const MyProfilePage = async () => {
  const session = await getServerSession();
  if (!session) return forbidden();

  const { token } = await getServerToken();
  try {
    await fetch("http://localhost:8081/secure", {
      headers: {
        Authorizarion: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    console.log(token)
  } catch (ex) {
    console.error("Error fetching data" + ex);
  }
  return (
    <Stack maw={640} mx={"auto"} mt={16} gap={16} lts={1} px={16}>
      <Text fw={600}>Profile Details</Text>
      <Divider></Divider>
      <Center mx={"auto"} pos={"relative"} mt={32} className="profileImg">
        <Avatar src={session?.user?.image} alt="it's me" h={120} w={120} radius={"lg"} />
        <IconPencil className="editIcon" color="white" />
      </Center>
      <div>{token}</div>
    </Stack>
  );
};

export default MyProfilePage;
