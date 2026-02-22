package com.e_commerce.common.model.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProductPriceDTO {
    private BigDecimal totalBasePrice; // total MRP
    private BigDecimal totalPrice; // total selling price
    List<ProductPriceDetailsDTO> priceDetailsDTOs;
}
