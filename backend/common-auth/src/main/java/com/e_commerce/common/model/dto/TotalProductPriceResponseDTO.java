package com.e_commerce.common.model.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TotalProductPriceResponseDTO {
    private BigDecimal totalBasePrice;
    private BigDecimal totalDiscountedPrice;
}
