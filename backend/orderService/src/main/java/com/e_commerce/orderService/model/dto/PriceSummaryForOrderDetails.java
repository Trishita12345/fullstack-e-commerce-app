package com.e_commerce.orderService.model.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PriceSummaryForOrderDetails {
    private BigDecimal itemsTotalMrp;
    private BigDecimal itemsTotalMrpAfterDiscount;
    private BigDecimal couponDiscount;
    private BigDecimal donation;
    private BigDecimal giftWrapFee;
    private BigDecimal shippingFee;
    private BigDecimal totalPaidAmount;
}
