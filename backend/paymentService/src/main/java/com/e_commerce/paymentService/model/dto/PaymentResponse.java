package com.e_commerce.paymentService.model.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

import com.e_commerce.paymentService.model.enums.PaymentStatus;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    private UUID paymentId;
    private UUID orderId;
    private BigDecimal amount;
    private PaymentStatus paymentStatus;
    private String transactionId;
}
