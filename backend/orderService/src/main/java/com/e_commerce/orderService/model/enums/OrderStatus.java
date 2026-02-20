package com.e_commerce.orderService.model.enums;

public enum OrderStatus {
    CREATED, // → user clicked place order
    RESERVED, // → inventory reserved successfully
    FAILED, // → inventory reservation failed/ payment failed /timeout
    CONFIRMED, // → payment successful
    CANCELLED, // → user cancelled

}
