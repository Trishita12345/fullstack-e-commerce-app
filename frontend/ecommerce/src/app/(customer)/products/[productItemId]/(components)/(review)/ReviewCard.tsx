import {
  Avatar,
  Box,
  Divider,
  Group,
  Rating,
  Stack,
  Text,
} from "@mantine/core";

interface ReviewCardProps {
  name: string;
  avatar: string | null;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  comment: string;
}
const ReviewCard = ({
  name,
  avatar,
  rating,
  date,
  comment,
}: ReviewCardProps) => {
  return (
    <Group wrap="nowrap" align="start">
      <Avatar src={avatar} h={36} w={36} mt={8} alt={name} />
      <Stack gap={12}>
        <Text size="sm" lts={0.7} fw={600}>
          {name}
        </Text>
        <Text c="dimmed" size="sm" mt={-8}>
          {date}
        </Text>
        <Rating value={rating} readOnly color="primaryDark.7" size="xs" />
        <Text size="sm" lts={0.7}>
          {comment}
        </Text>
        <Divider color="gray.2" mt={32} />
      </Stack>
    </Group>
  );
};

export default ReviewCard;
