import { en } from "@/constants/en";
import { StoriesType } from "@/constants/types";
import { Box, Stack, Title, Group, Text, Button } from "@mantine/core";
import Link from "next/link";
import StoriesCard from "@/(components)/storiesCard";
import { stories } from "../../stories/stories";

const InspiringStories = () => {
  return (
    <Box bg="gray.0" py={96} id="read-stories">
      <Box w={{ base: "90%", xl: "80%" }} mx={"auto"}>
        <Stack w={"100%"} gap={8} align="center">
          <Text
            style={{ fontFamily: "var(--font-allura)" }}
            size={"2rem"}
            c={"primaryDark.6"}
          >
            {en.inspiringStories}
          </Text>
          <Title
            order={1}
            fw={500}
            style={{ fontFamily: "var(--font-jost)" }}
            ta="center"
          >
            <div>{en.stayInformedOnOur}</div>
            <span>{en.latest} </span>
            <span style={{ color: "var(--mantine-color-primaryDark-6)" }}>
              {en.stories}
            </span>
          </Title>
        </Stack>
        <Group mt={48} gap={48} justify="center">
          {stories.slice(0, 3).map((item: StoriesType) => (
            <StoriesCard item={item} key={item.id} />
          ))}
        </Group>
        <Box w={200} mx="auto">
          <Link href="/stories">
            <Button color="primaryDark.6" size="lg" mt={48}>
              {en.readMore}
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default InspiringStories;
