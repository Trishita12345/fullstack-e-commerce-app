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
  parentCategory?: SelectOptionType | null;
  isParentCategory: boolean;
};
