import {IconProp} from "@fortawesome/fontawesome-svg-core";

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
    imageUrl: string;
    href: string;
}