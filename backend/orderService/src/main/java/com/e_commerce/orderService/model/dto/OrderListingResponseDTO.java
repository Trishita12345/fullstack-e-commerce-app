package com.e_commerce.orderService.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class OrderListingResponseDTO {
    private String orderId;
    private String orderStatus;
    private String createdAt;
    private String totalAmount;
    private String paymentMethod;
    private String paymentStatus;
    private boolean canRetry;
    private boolean canCancel;
}
