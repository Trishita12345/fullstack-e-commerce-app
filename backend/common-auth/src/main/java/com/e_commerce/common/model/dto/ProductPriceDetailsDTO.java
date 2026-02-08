package com.e_commerce.common.model.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProductPriceDetailsDTO {
    private UUID productItemId;
    private BigDecimal inventoryDiscountedPrice;
    private String sku;
    private Integer quantity;
    private BigDecimal gstPercentage;
}
