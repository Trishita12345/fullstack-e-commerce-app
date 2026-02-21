package com.e_commerce.common.utils;

import java.math.BigDecimal;

public class Constants {
    public static final String ORDER_CREATED_TOPIC = "order-created";
    public static final String ORDER_RESERVED_TOPIC = "order-reserved";
    public static final String INVENTORY_RESERVATION_TOPIC = "inventory-reservation";
    public static final String PAYMENT_CREATED_TOPIC = "payment-created";
    public static final String PAYMENT_STATUS_UPDATED_TOPIC = "payment-status-updated";
    public static final String ORDER_FULFILLED_TOPIC = "order-fulfilled";

    public static final BigDecimal GIFT_WRAP_CHARGE = BigDecimal.valueOf(35);
    public static final BigDecimal SHIPPING_CHARGE = BigDecimal.valueOf(99);
    public static final BigDecimal MIN_PURCHASE_VALUE = BigDecimal.valueOf(999);
    public static final BigDecimal ZERO = BigDecimal.ZERO;
}
