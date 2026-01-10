import { ProductReviewsResponseDTO } from "@/constants/types";

export const reviewData: ProductReviewsResponseDTO = {
  productId: "candle-deep-ocean",
  productName: "Deep Ocean Scented Candle",
  canLeaveReview: true,
  reviews: [
    {
    id: "rev-1",
          user: {
        id: '1',
      name: "John Rambo",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    rating: 4,
    createdAt: "Jul 16, 2024",
    comment:
      "The Deep Ocean Scented Candle is simply amazing! The scent is so refreshing and really does remind me of the sea. It burns cleanly and lasts a long time. Perfect for a relaxing evening at home. Highly recommend!",
  },
  {
    id: "rev-2",
    user: {
        id: '2',
      name: "Sarah Connors",
      avatarUrl: null,
    },
    rating: 5,
    createdAt: "Jul 16, 2024",
    comment:
      "I love the Deep Ocean Scented Candle! The fragrance is subtle yet powerful, filling my room with a calming ocean breeze aroma. It’s become a staple in my home for creating a peaceful atmosphere. Will definitely be buying more!",
  },
  {
    id: "rev-3",
    user: {
        id: '3',
      name: "Sarah Olatunji",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHwy",
    },
    rating: 5,
    createdAt: "Jul 16, 2024",
    comment:
      "Beautiful scent and premium quality. The candle burns evenly and the aroma is long-lasting without being overpowering. Highly impressed!",
  },
  ],
  summary: {
    averageRating: 4.3,
    totalReviews: 268,
    breakdown: [
      { stars: 5, percentage: 53 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 25 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 3 },
    ],
  },
};
