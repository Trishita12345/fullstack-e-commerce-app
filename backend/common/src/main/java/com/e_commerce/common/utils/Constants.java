package com.e_commerce.common.utils;

import java.math.BigDecimal;

public class Constants {
    public static final String ORDER_CREATED_TOPIC = "order-created";
    public static final String ORDER_CONFIRMED_FOR_NOTIFY_TOPIC = "order-confirmed-for-notify";
    public static final String ORDER_RESERVED_TOPIC = "order-reserved";
    public static final String INVENTORY_RESERVATION_TOPIC = "inventory-reservation";
    public static final String PAYMENT_CREATED_TOPIC = "payment-created";
    public static final String PAYMENT_SUCCESS_TOPIC = "payment-success";
    public static final String ORDER_FULFILLED_TOPIC = "order-fulfilled";
    public static final String PRODUCT_SEARCH_INDEX_UPDATED_TOPIC = "product-search-index-updated";
    public static final String PRODUCT_SEARCH_INDEX_DELETED_TOPIC = "product-search-index-deleted";
    public static final String EMAIL_VERIFICATION_NOTIFY_TOPIC = "email-verification-notify";

    public static final BigDecimal GIFT_WRAP_CHARGE = BigDecimal.valueOf(35);
    public static final BigDecimal SHIPPING_CHARGE = BigDecimal.valueOf(99);
    public static final BigDecimal MIN_PURCHASE_VALUE = BigDecimal.valueOf(999);
    public static final BigDecimal ZERO = BigDecimal.ZERO;

}
