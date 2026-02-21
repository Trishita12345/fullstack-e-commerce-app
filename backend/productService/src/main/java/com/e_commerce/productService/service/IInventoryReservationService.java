package com.e_commerce.productService.service;

import java.util.UUID;

import com.e_commerce.common.model.event.InventoryReserveEvent;
import com.e_commerce.common.model.event.OrderCreatedEvent;
import com.e_commerce.common.model.event.OrderFulfilledEvent;

public interface IInventoryReservationService {
    int getSellableStock(UUID productItemId);

    InventoryReserveEvent reserveInventoryForOrder(OrderCreatedEvent event);

    void updateInventoryForConfirmedOrder(OrderFulfilledEvent event);

    void updateInventoryForFailedOrder(OrderFulfilledEvent event);
}
