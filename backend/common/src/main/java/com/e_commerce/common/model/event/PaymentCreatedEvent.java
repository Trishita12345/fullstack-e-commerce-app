package com.e_commerce.common.model.event;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCreatedEvent {

    private UUID orderId;
    private UUID paymentId;
    private String transactionId;
    private String gatewayOrderId;
}
