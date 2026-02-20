package com.e_commerce.paymentService.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

import com.e_commerce.paymentService.model.enums.PaymentMethod;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {

    @NotNull
    private UUID orderId;

    @Positive
    private BigDecimal amount;

    @NotNull
    private PaymentMethod paymentMethod;
}
