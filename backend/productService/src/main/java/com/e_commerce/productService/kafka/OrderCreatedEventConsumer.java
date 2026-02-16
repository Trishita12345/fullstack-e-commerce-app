package com.e_commerce.productService.kafka;

import lombok.AllArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.InventoryReserveEvent;
import com.e_commerce.common.model.event.OrderCreatedEvent;
import com.e_commerce.productService.service.IInventoryReservationService;

@Service
@AllArgsConstructor
public class OrderCreatedEventConsumer {

    private final IInventoryReservationService inventoryReservationService;
    private final InventoryReservationEventProducer inventoryReservationEventProducer;

    @KafkaListener(topics = "order-created", groupId = "product-service-group")
    public void consumeOrderCreatedEvent(OrderCreatedEvent event) {
        System.out.println("Consumed order created event: " + event.toString());
        // Process the order created event and reserve inventory
        InventoryReserveEvent reservationEvent = inventoryReservationService.reserveInventoryForOrder(event);
        // Publish the inventory reservation result
        inventoryReservationEventProducer.publishInventoryReservation(reservationEvent);
    }
}
