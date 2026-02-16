package com.e_commerce.productService.service;

import java.util.UUID;

import com.e_commerce.common.model.event.InventoryReserveEvent;
import com.e_commerce.common.model.event.OrderCreatedEvent;

public interface IInventoryReservationService {
    int getSellableStock(UUID productItemId);

    InventoryReserveEvent reserveInventoryForOrder(OrderCreatedEvent event);
}
