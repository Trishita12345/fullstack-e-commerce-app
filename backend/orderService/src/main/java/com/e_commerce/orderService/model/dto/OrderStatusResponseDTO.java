package com.e_commerce.orderService.model.dto;

import java.math.BigDecimal;
import java.util.UUID;

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
    private String razorpayOrderId;
    private BigDecimal amount;
}
