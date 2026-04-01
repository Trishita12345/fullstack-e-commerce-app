package com.e_commerce.common.model.event;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PaymentStatusEvent {
    private String paymentStatus;
    private UUID orderId;
}
