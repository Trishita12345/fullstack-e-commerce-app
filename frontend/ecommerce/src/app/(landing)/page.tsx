import { Testimonials } from "@/app/(landing)/testimonial";
import { FastShipping } from "./fast-shipping";
import Banner from "./banner";
import ExploreProducts from "./explore-products";

export default function Home() {
  return (
    <div>
      <main>
        <Banner />
        <ExploreProducts />
        <Testimonials />
        <FastShipping />
      </main>
    </div>
  );
}
