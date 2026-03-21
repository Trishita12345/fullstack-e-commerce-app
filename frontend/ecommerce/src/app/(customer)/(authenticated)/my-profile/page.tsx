import { getServerSession, getServerToken } from "@/lib/get-server-auth";
import { Avatar, Box, Center, Stack } from "@mantine/core";
import { forbidden } from "next/navigation";

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
    <Stack maw={640} mx={"auto"}  >
      <Center miw={320} mih={320} mx={"auto"}>
        <Avatar src="avatar.png" alt="it's me" radius="xl" h={160} w={160} />
      </Center>
    </Stack>
  );
};

export default MyProfilePage;
