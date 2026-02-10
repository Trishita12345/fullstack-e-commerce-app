package com.e_commerce.orderService.model.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PriceSummaryResponseDTO {

    private BigDecimal itemsTotalMrp;

    private BigDecimal productDiscount;

    private BigDecimal couponDiscount;

    private BigDecimal donation;

    private BigDecimal giftWrapFee;

    private BigDecimal roundingAdjustment;

    private BigDecimal payableAmount;

    private BigDecimal shippingFee;

    private BigDecimal amountToAvoidShippingFee;

}
