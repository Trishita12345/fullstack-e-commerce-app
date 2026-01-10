import { ProductReviewsResponseDTO } from "@/constants/types";
import { Divider, Text, Box, Grid, GridCol } from "@mantine/core";
import ReviewSummary from "./ReviewSummary";
import ReviewDetails from "./ReviewDetails";
import "./review.css";

const ReviewSection = ({ reviews }: { reviews: ProductReviewsResponseDTO }) => {
  return (
    <Box mt={60} id="reviews">
      <Text lts={1} size="12px" fw={700} tt={"uppercase"} c={"black.8"}>
        Reviews
      </Text>
      <Divider color="gray.2" my={32} />
      <Grid className="reviewGrid" justify="space-between">
        <GridCol span={{ base: 12, md: 6, lg: 7 }}>
          <ReviewDetails reviews={reviews.reviews} />
        </GridCol>
        <GridCol span={{ base: 12, md: 5, lg: 4 }}>
          <ReviewSummary reviews={reviews} />
        </GridCol>
      </Grid>
    </Box>
  );
};

export default ReviewSection;
