package com.e_commerce.orderService.model.dto;

import java.util.List;
import java.util.UUID;

import com.e_commerce.common.model.enums.PaymentMode;
import com.e_commerce.orderService.model.enums.OrderStatus;
import com.e_commerce.orderService.model.enums.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class OrderDetailsResponseDTO {
    private UUID orderId;
    private OrderStatus orderStatus;
    private String createdAt;
    private PriceSummaryForOrderDetails priceSummary;
    private PaymentMode paymentMode;
    private PaymentStatus paymentStatus;
    private boolean canRetryPayment;
    private boolean canCancel;
    private List<OrderItemSummaryForOrderDetails> items;
    private String deliveryName;
    private String deliveryAddressDetails;
    private String contactNumber;
}
