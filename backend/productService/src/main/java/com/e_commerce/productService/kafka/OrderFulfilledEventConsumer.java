package com.e_commerce.productService.kafka;

import lombok.AllArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.OrderFulfilledEvent;
import com.e_commerce.common.utils.Constants;
import com.e_commerce.productService.service.IInventoryReservationService;

@Service
@AllArgsConstructor
public class OrderFulfilledEventConsumer {

    private final IInventoryReservationService inventoryReservationService;

    @KafkaListener(topics = Constants.ORDER_FULFILLED_TOPIC, groupId = "product-service-group")
    public void consumeOrderFulfilledEvent(OrderFulfilledEvent event) {
        if (event.getOrderStatus().equalsIgnoreCase("CONFIRMED")) {
            inventoryReservationService.updateInventoryForConfirmedOrder(event);
        } else {
            inventoryReservationService.updateInventoryForFailedOrder(event);
        }
    }
}
