import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type NavItem = {
  label: string;
  href: string;
};
export type PopoverContentItemProps = {
  label: string;
  href: string;
  icon: IconProp;
};
export type ProductsListingProps = {
  id: string;
  subCategory: string;
  rating: number;
  name: string;
  basePrice: number;
  discountedPrice?: number;
  addedToCart: boolean;
  addedToWishList: boolean;
  imgUrl: string;
};
export type BannerImageItem = {
  id: string;
  imageUrl: string;
  href: string;
};
export type StoriesType = {
  id: string;
  imgUrl: string;
  name: string;
  updatedAt: string;
};
export type SelectOptionType = {
  label: string;
  value: string;
};
export type Category = {
  name: string;
  parentCategoryId?: string;
};
export type CategoryListType = {
  id: string; // UUID as string in frontend
  name: string;
  description: string;
  imgUrl: string;
  parentCategory?: SelectOptionType | null;
  isParentCategory: boolean;
};
export type VariantListType = {
  variantId: string;
  variantName: string;
  CategoryId: string;
  CategoryName: string;
};

export interface SelectOptionTypeIDName {
  id: string; // UUID
  name: string;
}

export interface Variant {
  id: string; // UUID
  name: string;
  attributes: SelectOptionTypeIDName[];
}
export interface ProductsListingPageProps {
  productId: string;
  productName: string;
  categoryName: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Page<T> {
  content: T[];

  pageable: Pageable;

  totalPages: number;
  totalElements: number;
  size: number;
  number: number;

  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;

  sort?: Sort;
}
export interface QueryParamProps {
  page?: number;
  sortBy?: string;
  direction?: "asc" | "desc";
  query?: string;
}

export interface Product {
  productId?: string;
  productName: string;
  description: string;
  feature: string;
  categoryId: string;
}

export interface ProductVariant {
  sku: string;
  avlStock: number;
  basePrice: number;
  discountedPrice: number;
  imgUrls: {
    url: string,
    isThumbnail: boolean
  }[];
   attributes: {
    [key: string]: string;
  };
}

export interface VariantAttribute {
  variantId: string;
  variantName: string;
  attributes: SelectOptionType[];
}

export interface ProductItemListing {
  productItemId: string,
  sku: string,
  avlStock: number,
  basePrice: number,
  discountedPrice: number,
  imgUrl: string,
  attributes: string[]
}

export interface AddEditCategoryResponseType {
  id?: string;
  name: string;
  description: string;
  imgUrl: string;
  parentCategoryId: string;
}

export type VariantAttributeType = {
  name: string;
  productItemId: string;
};

export type ProductVariantAttribute = {
  variantName: string;
  attributes: VariantAttributeType[];
};

export type ProductDetailsDTO = {
  categoryName: string;
  productName: string;
  productId: string;
  description: string;
  feature: string;
  basePrice: number;
  discountedPrice: number;
  availableStock: number;
  variantAttributes: ProductVariantAttribute[];
  imgUrls: string[];
  rating: number;
  noOfReviews: number;
};
export interface pdpCartDataDTO {
  addedToWishList: boolean,
    noOfItemsInCart: number,
}
export interface ProductReviewsResponseDTO {
  productId: string;
  productName: string;
  reviews: ReviewDTO[];
  summary: ReviewSummaryDTO;
  canLeaveReview: boolean;
}
export interface RatingBreakdownDTO {
  stars: 1 | 2 | 3 | 4 | 5;
  percentage: number; // 0–100
}

export interface ReviewSummaryDTO {
  averageRating: number; // e.g. 4.3
  totalReviews: number;
  breakdown: RatingBreakdownDTO[];
}
export interface UserDTO {
  id: string;
  name: string;
  avatarUrl: string|null;
}

export interface ReviewDTO {
  id: string;
  user: UserDTO;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string; // ISO date from backend
}

