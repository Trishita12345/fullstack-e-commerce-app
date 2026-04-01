package com.e_commerce.common.model.event;

import java.math.BigDecimal;
import java.util.UUID;

import com.e_commerce.common.model.enums.PaymentGateway;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class OrderReservedEvent {
    private UUID orderId;
    private BigDecimal amount;
    private PaymentGateway paymentGateway;
    private String userId;
}
