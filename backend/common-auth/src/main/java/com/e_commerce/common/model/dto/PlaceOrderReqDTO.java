package com.e_commerce.common.model.dto;

import java.math.BigDecimal;

import com.e_commerce.common.model.enums.PaymentGateway;
import com.e_commerce.common.model.enums.PaymentMode;

import jakarta.annotation.Nullable;
import lombok.Data;

@Data
public class PlaceOrderReqDTO {
    private BigDecimal donation;
    private Boolean giftWrap;
    @Nullable
    private String selectedCouponCode;
    private PaymentMode paymentMode;
    @Nullable
    private PaymentGateway paymentGateway;
}
