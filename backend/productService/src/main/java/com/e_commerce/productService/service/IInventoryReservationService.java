package com.e_commerce.productService.service;

import java.util.UUID;

public interface IInventoryReservationService {
    boolean reserveInventory(UUID orderId, UUID productItemId, int qty);

    int getSellableStock(UUID productItemId);
}
