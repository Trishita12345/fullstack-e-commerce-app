package com.e_commerce.orderService.model.enums;

public enum OrderStatus {
    PENDING, // → user clicked place order
    CONFIRMED, // → inventory reserved successfully
    FAILED, // → inventory reservation failed
    CANCELLED, // → user cancelled / timeout

}
