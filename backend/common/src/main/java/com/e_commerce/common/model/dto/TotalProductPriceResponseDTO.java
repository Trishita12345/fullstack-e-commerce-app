package com.e_commerce.common.model.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class TotalProductPriceResponseDTO {
    private BigDecimal totalBasePrice;
    private BigDecimal totalDiscountedPrice;
}
