package com.e_commerce.productService.model.dto.productItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductItemFilter {
    private UUID productItemId;
    private String sku;
    private LocalDateTime updatedAt;
    private Integer availableStock;
    private BigDecimal discountedPrice;
    private BigDecimal basePrice;
    private String imgUrl;
    private String attributes;
}
