package com.e_commerce.productService.model.dto.productItem;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductItemPriceDTO {
    private BigDecimal basePrice;
    private BigDecimal discountedPrice;
    private String sku;
    private UUID id;
    private BigDecimal gstRate;
    private String productName;
    private String thumbnailImage;
}
