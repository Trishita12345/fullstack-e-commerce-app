package com.e_commerce.cartService.model.enums;

public enum CartStatus {

    /**
     * Active cart that user can modify
     */
    ACTIVE,

    /**
     * Cart has been used to create an order
     * Cart becomes read-only
     */
    CHECKED_OUT,

    /**
     * Cart expired due to inactivity
     */
    EXPIRED,

    /**
     * Cart merged into another cart (guest → logged-in)
     * Not used yet, reserved for future enhancement
     */
    MERGED
}
