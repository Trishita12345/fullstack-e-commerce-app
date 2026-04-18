import { Box, Text } from "@mantine/core";
import { stories } from "../stories";

interface PageProps {
    params: {
        id: string;
    };
}

const StoryDetails = async ({ params }: PageProps) => {
    const { id } = await params;
    const story = stories.find(s => s.id === id)

    return (
        <Box w={"90%"} mx={"auto"} pt={16}>
            <Text
                component="div"
                lts={1}
                size="13px"
                lh={1.8}
                dangerouslySetInnerHTML={{ __html: story?.description ?? "<p></p>" }}
            />
        </Box>

    )
}

export default StoryDetails;