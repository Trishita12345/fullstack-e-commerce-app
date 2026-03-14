import { PLPResponseDTO, ProductsListingProps } from "@/constants/types";

// export const products: ProductsListingProps[] = [
//   {
//     id: "1",
//     subCategory: "Wax Candles",
//     rating: 5,
//     name: "Cactus Plant Cented Candles",
//     basePrice: 299,
//     discountedPrice: 250,
//     addedToCart: true,
//     addedToWishList: true,
//     imgUrl:
//       "https://images.unsplash.com/photo-1560932992-a93e9ca8a0c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   },
//   {
//     id: "2",
//     subCategory: "Wax Candles",
//     rating: 4.5,
//     name: "Deep Ocean Candle",
//     basePrice: 599,
//     addedToCart: false,
//     addedToWishList: false,
//     imgUrl:
//       "https://images.unsplash.com/photo-1619799360851-a143fbc240b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   },
//   {
//     id: "3",
//     subCategory: "Wax Candles",
//     rating: 5,
//     name: "Scented Jar Candle Set of 4 | Jasmine, Lavender, Cinnamon Vanilla, Sandal",
//     basePrice: 299,
//     discountedPrice: 250,
//     addedToCart: true,
//     addedToWishList: true,
//     imgUrl:
//       "https://images.unsplash.com/photo-1560932992-a93e9ca8a0c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   },
//   {
//     id: "4",
//     subCategory: "Wax Candles",
//     rating: 4.5,
//     name: "Deep Ocean Candle",
//     basePrice: 599,
//     addedToCart: false,
//     addedToWishList: false,
//     imgUrl:
//       "https://images.unsplash.com/photo-1619799360851-a143fbc240b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   },
//   {
//     id: "5",
//     subCategory: "Wax Candles",
//     rating: 5,
//     name: "Cactus Plant Cented Candles",
//     basePrice: 299,
//     discountedPrice: 250,
//     addedToCart: true,
//     addedToWishList: true,
//     imgUrl:
//       "https://images.unsplash.com/photo-1560932992-a93e9ca8a0c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   },
//   {
//     id: "6",
//     subCategory: "Wax Candles",
//     rating: 4.5,
//     name: "Deep Ocean Candle",
//     basePrice: 599,
//     addedToCart: false,
//     addedToWishList: false,
//     imgUrl:
//       "https://images.unsplash.com/photo-1619799360851-a143fbc240b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   },

//   {
//     id: "6",
//     subCategory: "Wax Candles",
//     rating: 5,
//     name: "Cactus Plant Cented Candles",
//     basePrice: 299,
//     discountedPrice: 250,
//     addedToCart: true,
//     addedToWishList: true,
//     imgUrl:
//       "https://images.unsplash.com/photo-1560932992-a93e9ca8a0c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   },
//   {
//     id: "7",
//     subCategory: "Wax Candles",
//     rating: 4.5,
//     name: "Deep Ocean Candle",
//     basePrice: 599,
//     addedToCart: false,
//     addedToWishList: false,
//     imgUrl:
//       "https://images.unsplash.com/photo-1619799360851-a143fbc240b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   },
// ];
export const productsResponse: PLPResponseDTO = {
  products: {
    totalElements: 8,
    totalPages: 1,
    pageable: {
      pageNumber: 0,
      pageSize: 8,
      paged: true,
      unpaged: false,
      offset: 0,
      sort: [],
    },
    numberOfElements: 8,
    first: true,
    last: true,
    size: 8,
    number: 0,
    sort: [],
    empty: false,
    content: [
      {
        productItemId: "1",
        productId: "1",
        productName: "Cactus Plant Cented Candles",
        category: "Wax Candles",
        basePrice: 299,
        sellingPrice: 250,
        discountPercentage: 16,
        inStock: true,
        images: [
          {
            imgUrl:
              "https://images.unsplash.com/photo-1560932992-a93e9ca8a0c9",
            isThumbnail: true,
          },
        ],
        variants: [],
      },
      {
        productItemId: "2",
        productId: "2",
        productName: "Deep Ocean Candle",
        category: "Wax Candles",
        basePrice: 599,
        sellingPrice: 599,
        discountPercentage: 0,
        inStock: true,
        images: [
          {
            imgUrl:
              "https://images.unsplash.com/photo-1619799360851-a143fbc240b3",
            isThumbnail: true,
          },
        ],
        variants: [],
      },
      {
        productItemId: "3",
        productId: "3",
        productName:
          "Scented Jar Candle Set of 4 | Jasmine, Lavender, Cinnamon Vanilla, Sandal",
        category: "Wax Candles",
        basePrice: 299,
        sellingPrice: 250,
        discountPercentage: 16,
        inStock: true,
        images: [
          {
            imgUrl:
              "https://images.unsplash.com/photo-1560932992-a93e9ca8a0c9",
            isThumbnail: true,
          },
        ],
        variants: [],
      },
      {
        productItemId: "4",
        productId: "4",
        productName: "Deep Ocean Candle",
        category: "Wax Candles",
        basePrice: 599,
        sellingPrice: 599,
        discountPercentage: 0,
        inStock: true,
        images: [
          {
            imgUrl:
              "https://images.unsplash.com/photo-1619799360851-a143fbc240b3",
            isThumbnail: true,
          },
        ],
        variants: [],
      },
      {
        productItemId: "5",
        productId: "5",
        productName: "Cactus Plant Cented Candles",
        category: "Wax Candles",
        basePrice: 299,
        sellingPrice: 250,
        discountPercentage: 16,
        inStock: true,
        images: [
          {
            imgUrl:
              "https://images.unsplash.com/photo-1560932992-a93e9ca8a0c9",
            isThumbnail: true,
          },
        ],
        variants: [],
      },
      {
        productItemId: "6",
        productId: "6",
        productName: "Deep Ocean Candle",
        category: "Wax Candles",
        basePrice: 599,
        sellingPrice: 599,
        discountPercentage: 0,
        inStock: true,
        images: [
          {
            imgUrl:
              "https://images.unsplash.com/photo-1619799360851-a143fbc240b3",
            isThumbnail: true,
          },
        ],
        variants: [],
      },
      {
        productItemId: "6-2",
        productId: "6-2",
        productName: "Cactus Plant Cented Candles",
        category: "Wax Candles",
        basePrice: 299,
        sellingPrice: 250,
        discountPercentage: 16,
        inStock: true,
        images: [
          {
            imgUrl:
              "https://images.unsplash.com/photo-1560932992-a93e9ca8a0c9",
            isThumbnail: true,
          },
        ],
        variants: [],
      },
      {
        productItemId: "7",
        productId: "7",
        productName: "Deep Ocean Candle",
        category: "Wax Candles",
        basePrice: 599,
        sellingPrice: 599,
        discountPercentage: 0,
        inStock: true,
        images: [
          {
            imgUrl:
              "https://images.unsplash.com/photo-1619799360851-a143fbc240b3",
            isThumbnail: true,
          },
        ],
        variants: [],
      },
    ],
  },
  facets: {},
  total: 8,
};