import { Testimonials } from "@/app/(landing)/testimonial";
import { FastShipping } from "./fast-shipping";
import Banner from "./banner";
import ExploreProducts from "./explore-products";
import InspiringStories from "./inspiring-stories";
import ShopByCategories from "./shop-by-categories";

export default function Home() {
  return (
    <div>
      <main>
        <Banner />
        <ExploreProducts />
        <ShopByCategories />
        <FastShipping />
        <Testimonials />
        <InspiringStories />
      </main>
    </div>
  );
}
