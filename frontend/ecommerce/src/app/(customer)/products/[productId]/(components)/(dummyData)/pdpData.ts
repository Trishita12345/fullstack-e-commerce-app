import { ProductDetailsDTO } from "@/constants/types";

export const productDetailsDummy: ProductDetailsDTO = {
  categoryName: "Candle Set",
  productName: "Deep ocean scented candles",
  productId: "81ea368d-fc28-4cda-90ee-171a19fb5b4f",
  description:
    "<p>Create a warm, festive, and inviting atmosphere with our <strong>Fragrance Jar Candle Set of 4</strong>, thoughtfully curated to elevate your home décor and celebrations. This elegant candle set features four timeless fragrances—<strong>Jasmine, French Lavender, Cinnamon Vanilla, and Ivory Sandal</strong>—each designed to bring comfort, calm, and luxury into your living space.</p><p>Housed in sleek glass jars, these scented candles are perfect for enhancing everyday ambiance as well as special occasions like <strong>Diwali, housewarmings, festive gatherings, and gifting</strong>. From the soothing floral notes of jasmine and lavender to the cozy warmth of cinnamon vanilla and the grounding richness of sandalwood, this set offers a balanced fragrance journey for every mood and moment.</p><p>Crafted with a premium wax blend and carefully selected wicks, each candle delivers a clean, even burn with a long-lasting fragrance throw. Whether styled together as a décor set or placed individually across rooms, this candle collection adds elegance, warmth, and sensory comfort to your home.</p><h4><strong>Fragrances Included</strong></h4><ul><li><p><strong>Jasmine</strong> – Soft, floral, and calming</p></li><li><p><strong>French Lavender</strong> – Relaxing and soothing</p></li><li><p><strong>Cinnamon Vanilla</strong> – Warm, cozy, and comforting</p></li><li><p><strong>Ivory Sandal</strong> – Rich, woody, and grounding</p></li></ul><p></p>",
  feature:
    "<ul><li><p><strong>Set of 4 premium scented jar candles</strong></p></li><li><p><strong>Elegant glass jar design</strong> for stylish home décor</p></li><li><p><strong>Long-lasting fragrance</strong> with clean, even burn</p></li><li><p><strong>Premium wax blend</strong> for minimal soot and smoke</p></li><li><p><strong>Perfect for Diwali décor, gifting, and celebrations</strong></p></li><li><p><strong>Ideal for living rooms, bedrooms, and festive settings</strong></p></li><li><p><strong>Lavender, Cinnamon Vanilla, Jasmine, Ivory Sandal Fragrance</strong></p></li></ul><p><em>A beautifully curated fragrance set that brings warmth, calm, and festive elegance into every corner of your home.</em><br><br></p>",
  basePrice: 899,
  discountedPrice: 699,
  availableStock: 42,

  variantAttributes: [
    {
      variantName: "Size",
      attributes: [
        {
          name: "100g",
          isSelected: false,
          productItemId: "item-size-100"
        },
        {
          name: "200g",
          isSelected: true,
          productItemId: "item-size-200"
        },
        {
          name: "300g",
          isSelected: false,
          productItemId: "item-size-300"
        }
      ]
    },
    {
      variantName: "Fragrance",
      attributes: [
        {
          name: "Lavender",
          isSelected: true,
          productItemId: "item-frag-lav"
        },
        {
          name: "Vanilla",
          isSelected: false,
          productItemId: "item-frag-van"
        },
        {
          name: "Rose",
          isSelected: false,
          productItemId: "item-frag-rose"
        }
      ]
    },
    {
      variantName: "Jar Color",
      attributes: [
        {
          name: "Clear Glass",
          isSelected: true,
          productItemId: "item-jar-clear"
        }
      ]
    }
  ],

  imgUrls: [
    "https://loom-and-lume.s3.ap-south-1.amazonaws.com/products/247b2a49-8c77-4403-a8c2-6076b629b0ca-91apowxhfel.-sl1500-.jpg",
    "https://loom-and-lume.s3.ap-south-1.amazonaws.com/products/fec26eaa-3b9b-4647-9e78-f4500953075f-ayra-icons-website.webp",
    "https://loom-and-lume.s3.ap-south-1.amazonaws.com/products/94de7dd3-f37c-4eef-bee8-156f00f0b4c3-91na-x6nn4l.-sl1500-.jpg",
    "https://loom-and-lume.s3.ap-south-1.amazonaws.com/products/f858a389-4931-461c-a4e7-b6bbb8c36139-81fogwkn8-l.-sl1500-.jpg",
    "https://loom-and-lume.s3.ap-south-1.amazonaws.com/products/94965603-666f-4a80-b47c-66255292b7c6-81b-4zbovyl.-sl1500-.jpg",
    "https://loom-and-lume.s3.ap-south-1.amazonaws.com/products/2f43b42d-208e-4312-93e5-b89c115b055a-81qi-rxqgnl.-sl1500-.jpg",
    "https://loom-and-lume.s3.ap-south-1.amazonaws.com/products/e99e36b6-28cd-4318-b046-c1115fcdbebb-candle-care-website.webp"
  ],

  rating: 4.6,
  noOfReviews: 128
};
