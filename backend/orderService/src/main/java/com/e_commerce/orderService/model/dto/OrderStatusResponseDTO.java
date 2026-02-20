package com.e_commerce.orderService.model.dto;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OrderStatusResponseDTO {
    private UUID orderId;
    private String orderStatus;
    private String paymentStatus;
    private String transactionId;
    @Nullable
    private String gatewayOrderId;
    private BigDecimal amount;
}
