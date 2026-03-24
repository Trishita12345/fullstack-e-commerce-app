import { getServerSession, getServerToken } from "@/lib/get-server-auth";
import { Avatar, Box, Button, Center, Divider, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import "./profile.css"
import { ViewToken } from "./ViewToken";
import { getUser } from "./actions";
import Link from "next/link";

const Row = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Grid justify="space-around" visibleFrom="sm">
      <GridCol span={6}>
        <Text style={{ fontFamily: "var(--font-poppins)" }} lts={0.4} size='sm' c='gray.7'>
          {label}:
        </Text>
      </GridCol>
      <GridCol span={6}>
        <Text style={{ fontFamily: "var(--font-poppins)" }} lts={0.4} size='sm'>
          {value}
        </Text>
      </GridCol>
    </Grid>
    <Stack hiddenFrom="sm" gap={4}>
      <Text style={{ fontFamily: "var(--font-poppins)" }} lts={0.4} size='sm' c='gray.7'>
        {label}:
      </Text>
      <Text style={{ fontFamily: "var(--font-poppins)" }} lts={0.4} size='sm'>
        {value}
      </Text>
    </Stack>
  </Box>
)


const MyProfilePage = async () => {
  const session = await getServerSession();
  const user = await getUser();
  const { phoneNumber, emailId, fullname, profileImg, gender, dob } = user;
  const { token } = await getServerToken();

  const formattedDate = (input: string) => {
    return input === '' ? '' : new Date(input).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  };

  return (
    <Stack maw={640} mx={"auto"} mt={16} gap={16} lts={1} px={16}>
      <Group>
        <Text fw={600} style={{ fontFamily: "var(--font-poppins)" }}>Profile Details</Text>
        {session?.user.role === 'SELLER' && <ViewToken token={token} />}
      </Group>
      <Divider />
      <Center mx={"auto"} mb={16}>
        <Avatar src={profileImg || ''} alt="it's me" h={120} w={120} radius={"lg"} />
        {/* <IconPencil className="editIcon" color="white" cursor={'pointer'} /> */}
      </Center>
      <Row label="Full Name" value={fullname} />
      <Row label="Email Id" value={emailId} />
      <Row label="PhoneNumber" value={phoneNumber || '-not added-'} />
      <Row label="Gender" value={gender || '-not added-'} />
      <Row label="Date of Birth" value={dob ? formattedDate(dob) : '-not added-'} />
      <Link href='/my-profile/edit' style={{ width: '100%' }}>
        <Button color='primaryDark.7' mt={16} fullWidth>
          Edit Profile
        </Button>
      </Link>
    </Stack>
  );
};

export default MyProfilePage;
