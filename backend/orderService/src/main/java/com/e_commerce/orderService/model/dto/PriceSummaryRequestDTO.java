package com.e_commerce.orderService.model.dto;

import java.math.BigDecimal;
import java.util.List;

import com.e_commerce.common.model.dto.CartItemDTO;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
public class PriceSummaryRequestDTO {
    List<CartItemDTO> cartItems;
    private BigDecimal donation;
    private Boolean giftWrap;
    @Nullable
    private String selectedCouponCode;

}
