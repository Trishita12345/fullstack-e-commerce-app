package com.e_commerce.orderService.model.enums;

public enum OrderStatus {
    CREATED, // → user clicked place order
    RESERVED, // → inventory reserved successfully
    FAILED, // → inventory reservation failed/ timeout
    CONFIRMED, // → payment successful
    CANCELLED, // → user cancelled

}
