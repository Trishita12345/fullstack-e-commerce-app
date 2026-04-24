import { ProductItem, SearchProductVariant } from "@/constants/types";
import "./productCard.css";
import ProductCardPlp from "./ProductCardPlp";
import ProductCartHomepage from "./ProductCardHomepage";

const ProductCard = ({ product, stockQuantity, isPLP = false }: { product: ProductItem; stockQuantity: number; isPLP?: boolean }) => {
  return (
    <>
      {isPLP ?
        <ProductCardPlp product={product} stockQuantity={stockQuantity} />
        : <ProductCartHomepage product={product} stockQuantity={stockQuantity} />
      }
    </>)
}


export default ProductCard;


