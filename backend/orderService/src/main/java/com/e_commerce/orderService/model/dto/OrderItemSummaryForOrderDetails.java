package com.e_commerce.orderService.model.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemSummaryForOrderDetails {
    private UUID orderItemId;
    private String sku;
    private String productName;
    private String productImg;
    private Integer quantity;
    private BigDecimal basePrice;
    private BigDecimal discountedPrice;
    private BigDecimal couponDiscount;
    private BigDecimal finalPrice;
}
