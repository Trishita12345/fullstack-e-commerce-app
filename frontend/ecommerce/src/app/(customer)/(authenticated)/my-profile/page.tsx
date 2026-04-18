import { Avatar, Box, Button, Center, Divider, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { getCurrentUser } from "@/lib/getCurrentUser";

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
  const user = await getCurrentUser();

  const formattedDate = (input: string) => {
    return input === '' ? '' : new Date(input).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  };

  return (
    <Stack maw={640} mx={"auto"} mt={'5vh'} gap={16} lts={1} px={16} >
      <Text fw={600} style={{ fontFamily: "var(--font-poppins)" }}>Profile Details</Text>
      <Divider />
      <Row label="Full Name" value={user.fullName || '-not added-'} />
      <Row label="Email Id" value={user.emailId || '-not added-'} />
      <Row label="PhoneNumber" value={user.phoneNumber || '-not added-'} />
      <Row label="Gender" value={user.gender || '-not added-'} />
      <Row label="Date of Birth" value={user.dob ? formattedDate(user.dob) : '-not added-'} />
      <Link href='/my-profile/edit' style={{ width: '100%' }}>
        <Button color='primaryDark.7' mt={16} fullWidth>
          Edit Profile
        </Button>
      </Link>
    </Stack >
  );
};

export default MyProfilePage;
