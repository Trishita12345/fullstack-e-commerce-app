package com.e_commerce.productService.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.InventoryReserveEvent;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InventoryReservationEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    private static final String TOPIC = "inventory-reservation";

    public void publishInventoryReservation(InventoryReserveEvent event) {
        kafkaTemplate.send(TOPIC, event.getOrderId().toString(), event);
    }
}
