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
    url: string;
    isThumbnail: boolean;
  }[];
  attributes: {
    [key: string]: string;
  };
  hsn: string;
}

export interface VariantAttribute {
  variantId: string;
  variantName: string;
  attributes: SelectOptionType[];
}

export interface ProductItemListing {
  productItemId: string;
  sku: string;
  avlStock: number;
  basePrice: number;
  discountedPrice: number;
  imgUrl: string;
  attributes: string[];
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
export interface PdpCartDataDTO {
  noOfItemsInCart: number;
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
  avatarUrl: string | null;
}

export interface ReviewDTO {
  id: string;
  user: UserDTO;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string; // ISO date from backend
}

export interface CartItemDTO {
  productItemId: string;
  quantity: number;
  updatedQuantity: number;
  priceSnapshot: number;
  isSelected?: boolean;
}
export interface CartItemDbDTO {
  productItemId: string;
  quantity: number;
  priceSnapshot: number;
  isSelected?: boolean;
}
export interface TotalPriceFromProductDTO {
  totalBasePrice: number;
  totalDiscountedPrice: number;
}

export interface CartProducts {
  sku: string;
  productName: string;
  productItemId: string;
  basePrice: number;
  discountedPrice: number;
  availableStock: number;
  imgUrl: string;
}

export interface CartProductsDTO {
  [productItemId: string]: CartProducts;
}

export enum AddressType {
  HOME = "HOME",
  OFFICE = "WORK",
  OTHER = "OTHER",
}
export interface AddressDTO {
  addressId?: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string | null;
  landmark?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: AddressType;
  isDefault: boolean;
  isSelected: boolean;
}

export enum PaymentModeType {
  COD = "COD",
  PREPAID = "PREPAID",
}

export interface PlaceOrderReqDTO {
  donation: number;
  giftWrap: boolean;
  selectedCouponCode: string | null;
  paymentMode: PaymentModeType;
  paymentGateway?: string;
  deliveryAddressId: string;
}
export interface PriceSummaryResponse {
  itemsTotalMrp: number;
  productDiscount: number;
  couponDiscount: number;
  donation: number;
  giftWrapFee: number;
  payableAmount: number;
  shippingFee: number;
  amountToAvoidShippingFee: number;
}

export interface TotalPriceFromProductDTORequest {
  productItemId: string;
  quantity: number;
}
export interface PriceSummaryRequest {
  donation: number;
  giftWrap: boolean;
  selectedCouponCode: string | null;
  cartItems: {
    productItemId: string;
    quantity: number;
  }[];
}

export interface OrderStatusPollingResponse {
  orderId: string;
  orderStatus: string;
  paymentStatus: string;
  transactionId: string;
  gatewayOrderId: string;
  amount: number;
  paymentMode: string;
}

export interface PriceSummary {
  itemsTotalMrp: number;
  itemsTotalMrpAfterDiscount: number;
  couponDiscount: number;
  donation: number;
  giftWrapFee: number;
  shippingFee: number;
  totalPaidAmount: number;
}

export interface OrderItem {
  orderItemId: string;
  sku: string;
  productName: string;
  productImg: string;
  quantity: number;
  basePrice: number;
  sellingPrice: number;
  couponDiscount: number;
  finalPrice: number;
}
export interface OrderDetailsDTO {
  orderId: string;
  orderStatus: string;
  createdAt: string; // ISO date string
  priceSummary: PriceSummary;
  paymentMode: string;
  paymentStatus: string;
  canRetryPayment: boolean;
  canCancel: boolean;
  items: OrderItem[];
  deliveryName: string;
  deliveryAddressDetails: string;
  contactNumber: string;
}
