import { en } from "@/constants/en";
import { StoriesType } from "@/constants/types";
import { Box, Stack, Title, Group, Text, Button } from "@mantine/core";
import Link from "next/link";
import StoriesCard from "@/(components)/storiesCard";

const stories = [
  {
    id: "1",
    imgUrl:
      "https://images.unsplash.com/photo-1612293905607-b003de9e54fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FuZGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
    name: "Top 5 Scented Candles to Transform Your home Ambience",
    updatedAt: "16 Oct 2025",
  },
  {
    id: "2",
    imgUrl:
      "https://images.unsplash.com/photo-1602952706017-f3cc19eb98af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGNhbmRsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    name: "How to Choose Perfect candle for Any Occasion",
    updatedAt: "16 Oct 2025",
  },
  {
    id: "3",
    imgUrl:
      "https://images.unsplash.com/photo-1610410863509-aa6ee0b12d76?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGNhbmRsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    name: "The Benefits of Aromatherapy Candles for Relaxation",
    updatedAt: "14 Sep 2025",
  },
];
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
          {stories.map((item: StoriesType) => (
            <StoriesCard item={item} key={item.id} />
          ))}
        </Group>
        <Box w={200} mx="auto">
          <Button color="primaryDark.6" size="lg" mt={48}>
            <Link href="/strore">{en.readMore}</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InspiringStories;
