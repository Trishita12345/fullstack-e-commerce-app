import { Group, Stack, Text } from "@mantine/core";
import { IconPointer } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const CartEmpty = () => {
  return <Stack mx={"auto"} w={"100%"} align="center" gap={8} my={24}>
    <Image src="/assets/CartEmpty.svg" height={300} width={300} alt="empty" />
    <Text c={"dimmed"} ta={"center"} size="xl" fw={700} w={"350px"}>No issue. Store is still open. You just need to take a deep breath. and </Text>
    <Link href={"/"}>
      <Stack align="center">
        <Text c="primaryDark.7" ta={"center"} size="xl" fw={700} w={"350px"}>Keep shopping &nbsp; :)</Text>
        <Group gap={2}><IconPointer /><Text size="xs" c="dimmed" fw={500}>Click Here</Text></Group>
      </Stack>
    </Link>
  </Stack>;
};

export default CartEmpty;
