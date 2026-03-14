package com.e_commerce.orderService.model.enums;

public enum PaymentStatus {
    NOT_INITIATED, // order created but item not reserved yet
    PENDING, // Payment not attempted, item reserved
    INITIATED, // Payment process started, gateway id received
    SUCCESS, // Payment successful
    FAILED, // Payment failed
    ABANDONED // Payment cancelled by user or system
}
