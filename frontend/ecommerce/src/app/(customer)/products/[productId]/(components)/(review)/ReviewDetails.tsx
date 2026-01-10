import { ReviewDTO } from "@/constants/types";
import { Fragment } from "react";
import ReviewCard from "./ReviewCard";
import { Stack, Text } from "@mantine/core";

const ReviewDetails = ({ reviews }: { reviews: ReviewDTO[] }) => {
  return (
    <>
      <Stack gap={48}>
        {reviews.map((review) => (
          <Fragment key={review.id}>
            <ReviewCard
              name={review.user.name}
              avatar={review.user.avatarUrl}
              rating={review.rating}
              date={review.createdAt}
              comment={review.comment}
            />
          </Fragment>
        ))}
      </Stack>
      <Text
        ta={"center"}
        my={60}
        size="xs"
        fw={600}
        lts={0.5}
        style={{ cursor: "pointer" }}
      >
        Show More
      </Text>
    </>
  );
};

export default ReviewDetails;
