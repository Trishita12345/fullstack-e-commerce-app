"use client";
import { ProductDetailsDTO } from "@/constants/types";
import { scrollToId } from "@/utils/helperFunctions";
import { Group, Rating, Text } from "@mantine/core";
import Link from "next/link";

const UpperRatingSection = ({ pdpData }: { pdpData: ProductDetailsDTO }) => {
  return (
    // <Link href={"#reviews"}>
    <Group
      style={{ cursor: "pointer" }}
      onClick={() => {
        scrollToId("reviews");
      }}
    >
      <Rating
        value={pdpData.rating}
        fractions={2}
        readOnly
        size={"xs"}
        color={"primaryDark.5"}
      />
      <Text c={"primaryDark.7"} size="12px" lts={0.6} fw={500}>{`${
        pdpData.noOfReviews
      } Review${pdpData.noOfReviews > 1 ? "s" : ""}`}</Text>
    </Group>
    // </Link>
  );
};

export default UpperRatingSection;
