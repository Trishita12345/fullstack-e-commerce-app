package com.e_commerce.productService.model.dto.product;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class ProductListingResponseDTO {
    private UUID productId;
    private String productName;
    private String categoryName;
}
