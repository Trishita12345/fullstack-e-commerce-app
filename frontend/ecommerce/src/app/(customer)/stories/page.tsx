import StoriesCard from "@/(components)/storiesCard"
import { en } from "@/constants/en"
import { StoriesType } from "@/constants/types"
import { Box, Stack, Title, Group, Button, Text } from "@mantine/core"
import { stories } from "./stories"

const AllStories = () => {
    return (
        <Box py={48}>
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
            </Box>
        </Box>
    )
}

export default AllStories;