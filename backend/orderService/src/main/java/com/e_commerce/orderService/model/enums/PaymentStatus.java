package com.e_commerce.orderService.model.enums;

public enum PaymentStatus {
    NOT_INITIATED,
    PENDING, // Payment not attempted, item reserved
    INITIATED, // Payment process started, gateway id received
    SUCCESS, // Payment successful
    FAILED, // Payment failed
    CANCELLED // Payment cancelled by user or system
}
