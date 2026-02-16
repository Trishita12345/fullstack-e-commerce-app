package com.e_commerce.orderService.kafka;

import com.e_commerce.orderService.service.IOrderService;

import lombok.AllArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.InventoryReserveEvent;
import com.e_commerce.orderService.model.enums.OrderStatus;

@Service
@AllArgsConstructor
public class InventoryEventConsumer {

    private final IOrderService orderService;

    @KafkaListener(topics = "inventory-reservation", groupId = "order-service-group")
    public void consumeInventoryReservationResult(InventoryReserveEvent event) {
        System.out.println("Consumed inventory reservation result: " + event.toString());
        if (event.isSuccess()) {
            // Update order status to CONFIRMED
            System.out.println("Inventory reserved successfully for order: " + event.getOrderId());
            orderService.updateOrderStatus(event.getOrderId(), OrderStatus.CONFIRMED);
        } else {
            // Update order status to FAILED
            System.out.println("Inventory reservation failed for order: " + event.getOrderId() + ". Reason: "
                    + event.getMessage());
            orderService.updateOrderStatus(event.getOrderId(), OrderStatus.FAILED);
        }
    }
}
