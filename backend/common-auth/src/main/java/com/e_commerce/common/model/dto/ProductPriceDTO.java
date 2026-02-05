package com.e_commerce.common.model.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Data;

@Data
public class ProductPriceDTO {
    private UUID productItemId;
    private BigDecimal price;
    private String sku;
    private String productName;
}
