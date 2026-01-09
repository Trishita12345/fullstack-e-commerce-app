import Breadcrumb from "@/(components)/Breadcrumb";
import { pdpCartDataDTO } from "@/constants/types";
import { Accordion, Box, Divider, Grid, GridCol, Stack } from "@mantine/core";
import { productDetailsDummy } from "./(components)/(dummyData)/pdpData";
import ImageComponent from "./(components)/ImageComponent";
import PriceSection from "./(components)/PriceSection";
import UpperRatingSection from "./(components)/UpperRatingSection";
import TitleScetion from "./(components)/TitleScetion";
import Variants from "./(components)/Variants";
import ButtonSection from "./(components)/ButtonSection";
import PdpAccordionItem from "./(components)/PdpAccordianItem";
import ReviewSection from "./(components)/(review)/ReviewSection";
import { reviewData } from "./(components)/(dummyData)/productReviewData";
import { en } from "@/constants/en";

interface PageProps {
  params: {
    productId: string;
  };
}
const PDP = async ({ params }: PageProps) => {
  const { productId } = params;
  const pdpData = productDetailsDummy; //await apiFetch<ProductDetailsDTO>(`/public/products/${productId}`);
  const reviews = reviewData;
  const pdpCartData: pdpCartDataDTO = {
    addedToWishList: false,
    noOfItemsInCart: 2,
  };
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
              product={{ name: pdpData.productName, id: productId }}
            />
          </GridCol>
          <GridCol span={{ base: 12, sm: 6, md: 6.5, lg: 7 }}>
            <Stack gap={24}>
              <TitleScetion pdpData={pdpData} />
              <PriceSection pdpData={pdpData} />
              <UpperRatingSection pdpData={pdpData} />
              <Variants pdpData={pdpData} />
              <ButtonSection pdpData={pdpData} pdpCartData={pdpCartData} />
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
