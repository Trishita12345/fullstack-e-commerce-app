package com.e_commerce.orderService.model.enums;
public enum OrderItemStatus {

    CREATED,                // Order created
    INVENTORY_PENDING,      // Waiting for inventory reservation
    CONFIRMED,              // Inventory reserved, order valid
    CANCELLED,              // Order cancelled before delivery

    DELIVERED,              // Order delivered to user

    RETURN_REQUESTED,       // User requested return
    RETURNED,               // Item returned successfully

    REPLACEMENT_REQUESTED,  // User requested replacement
    REPLACED, // Replacement completed

    REFUND_INITIATED,
    REFUNDED     // Payment refunded (future)
}
