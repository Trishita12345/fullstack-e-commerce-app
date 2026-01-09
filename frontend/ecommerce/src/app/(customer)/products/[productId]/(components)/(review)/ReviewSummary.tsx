import {
  ProductReviewsResponseDTO,
  RatingBreakdownDTO,
  ReviewSummaryDTO,
} from "@/constants/types";
import {
  Box,
  Button,
  Group,
  Progress,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";

const RatingBreakdown = ({ stars, percentage }: RatingBreakdownDTO) => (
  <Group gap={4}>
    <Text size="xs" fw={600}>
      {stars}
    </Text>
    <IconStarFilled size={12} color="var(--mantine-color-primaryDark-7)" />
    <Progress
      value={percentage}
      w="70%"
      color="primaryDark.7"
      ml={16}
      size={"xs"}
    />
    <Text size="10px" fw={600} ml={8}>
      {percentage}%
    </Text>
  </Group>
);
const ReviewSummary = ({ reviews }: { reviews: ProductReviewsResponseDTO }) => {
  const { summary } = reviews;
  return (
    <Stack gap={48}>
      <Stack bd={`1px solid var(--mantine-color-gray-2)`} p={32}>
        <Text size="xs" lts={0.7} fw={600} tt="uppercase">
          Reviews Summary
        </Text>
        <Group>
          <Rating
            value={summary.averageRating}
            readOnly
            color="primaryDark.7"
            size="xs"
          />
          <Text size="xs" lts={0.6} fw={500}>
            {`Based on ${summary.totalReviews} review${
              summary.totalReviews > 1 ? "s" : ""
            }`}
          </Text>
        </Group>
        <Stack gap={6}>
          {summary.breakdown.map((r) => (
            <RatingBreakdown
              stars={r.stars}
              percentage={r.percentage}
              key={r.stars}
            />
          ))}
        </Stack>
      </Stack>
      {reviews.canLeaveReview && (
        <Stack gap={24}>
          <Text size="sm" lts={0.7} fw={600}>
            Share your thoughts
          </Text>
          <Text size="sm" lts={0.7}>
            If you have used this product, share your thought with other
            customers.
          </Text>
          <Button color="black" size="lg" fullWidth>
            <Text>Leave a review</Text>
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default ReviewSummary;
