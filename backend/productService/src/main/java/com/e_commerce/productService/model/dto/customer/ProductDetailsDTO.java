package com.e_commerce.productService.model.dto.customer;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class ProductDetailsDTO {

    private String categoryName;
    private String productName;
    private UUID productId;
    private String description;
    private String feature;
    private Double basePrice;
    private Double discountedPrice;
    private Integer availableStock;
    private List<ProductVariantAttributeDTO> variantAttributes;
    private List<String> imgUrls;
    private Double rating;
    private Integer noOfReviews;

    public ProductDetailsDTO(String categoryName, String productName, UUID productId, String description,
            String feature, Double basePrice, Double discountedPrice, Integer availableStock, Double rating,
            Integer noOfReviews) {
        this.categoryName = categoryName;
        this.productName = productName;
        this.productId = productId;
        this.description = description;
        this.feature = feature;
        this.basePrice = basePrice;
        this.discountedPrice = discountedPrice;
        this.availableStock = availableStock;
        this.rating = rating;
        this.noOfReviews = noOfReviews;
    }

}
