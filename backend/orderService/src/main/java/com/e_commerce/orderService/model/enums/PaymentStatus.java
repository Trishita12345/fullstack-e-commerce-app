package com.e_commerce.orderService.model.enums;

public enum PaymentStatus {
    NOT_INITIATED,
    PENDING, // Payment not attempted or waiting
    SUCCESS, // Payment successful
    FAILED // Payment failed
}
