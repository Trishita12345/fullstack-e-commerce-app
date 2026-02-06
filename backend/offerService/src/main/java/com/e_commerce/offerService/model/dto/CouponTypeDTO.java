package com.e_commerce.offerService.model.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CouponTypeDTO {

    private String couponCode;
    private Integer discountPercent;
    private String description;
    private String expiresOn;
    private BigDecimal minPurchaseAmount;
}

