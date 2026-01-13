export const dynamic = "force-static";

import Breadcrumb from "@/(components)/Breadcrumb";
import { Accordion, Box, Divider, Grid, GridCol, Stack } from "@mantine/core";
import ImageComponent from "./(components)/ImageComponent";
import PriceSection from "./(components)/PriceSection";
import UpperRatingSection from "./(components)/UpperRatingSection";
import TitleSection from "./(components)/TitleSection";
import Variants from "./(components)/Variants";
import ButtonSection from "./(components)/ButtonSection";
import PdpAccordionItem from "./(components)/PdpAccordianItem";
import ReviewSection from "./(components)/(review)/ReviewSection";
import { reviewData } from "./(components)/(dummyData)/productReviewData";
import { en } from "@/constants/en";
import { pdpCartData } from "./(components)/pdpCartData";
import { ProductDetailsDTO } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";

interface PageProps {
  params: {
    productItemId: string;
  };
}
export async function generateStaticParams() {
  const productItemIds = await apiFetch<{ productItemId: string }[]>(
    "/product-service/public/products/list-productItemId",
    {
      cache: "force-cache",
      revalidate: 3600,
    }
  );
  return productItemIds;
}

async function getPDPData(productItemId: string) {
  return await apiFetch<ProductDetailsDTO>(
    `/product-service/public/products/${productItemId}`,
    {
      cache: "force-cache",
      revalidate: 3600,
    }
  );
}
export async function generateMetadata({ params }: PageProps) {
  const { productItemId } = await params;
  const pdp = await getPDPData(productItemId);

  return {
    title: pdp.productName,
    description: pdp.description,
    openGraph: {
      title: pdp.productName,
      images: pdp.imgUrls,
    },
  };
}

const PDP = async ({ params }: PageProps) => {
  const { productItemId } = await params;
  const pdpData = await getPDPData(productItemId);
  const reviews = reviewData;
  const pdpCartDetails = pdpCartData;
  const breadcrumbs = [
    { title: "Home", href: "/" },
    {
      title: pdpData.categoryName,
      href: `/products?category=${pdpData.categoryName}`,
    },
    {
      title: pdpData.productName,
      href: "#",
      active: true,
    },
  ];
  return (
    <Box
      bg="gray.0"
      style={{
        borderTop: `1.5px solid var(--mantine-color-gray-1)`,
      }}
    >
      <Box w={{ base: "90%", md: "85%" }} mx="auto" py={48}>
        <Breadcrumb items={breadcrumbs} />
        <Grid>
          <GridCol span={{ base: 12, sm: 5.7, md: 5.5, lg: 5 }}>
            <ImageComponent
              images={pdpData.imgUrls}
              product={{ name: pdpData.productName, id: productItemId }}
            />
          </GridCol>
          <GridCol span={{ base: 12, sm: 6, md: 6.5, lg: 7 }}>
            <Stack gap={24}>
              <TitleSection pdpData={pdpData} />
              <PriceSection pdpData={pdpData} />
              <UpperRatingSection pdpData={pdpData} />
              <Variants pdpData={pdpData} productItemId={productItemId} />
              <ButtonSection pdpData={pdpData} pdpCartData={pdpCartDetails} />
              <Divider color="gray.2" mb={-24} />
              <Accordion>
                <PdpAccordionItem
                  label={"Description"}
                  content={pdpData.description}
                />
                <PdpAccordionItem
                  label={"Features"}
                  content={pdpData.feature}
                />
                <PdpAccordionItem
                  content={en.shippingContent}
                  label={"Shipping"}
                />
                <PdpAccordionItem content={en.returnContent} label={"Return"} />
              </Accordion>
            </Stack>
          </GridCol>
        </Grid>
        <ReviewSection reviews={reviews} />
      </Box>
    </Box>
  );
};

export default PDP;
