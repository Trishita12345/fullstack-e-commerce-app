package com.e_commerce.productService.model.dto.customer;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CartProductItemInfoResponse {
    private String productName;
    private UUID productItemId;
    private Double basePrice;
    private Double discountedPrice;
    private Integer availableStock;
    private String imgUrl;
}
