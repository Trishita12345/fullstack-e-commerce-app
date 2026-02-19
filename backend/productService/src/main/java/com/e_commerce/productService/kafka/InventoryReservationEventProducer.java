package com.e_commerce.productService.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.InventoryReserveEvent;
import com.e_commerce.common.utils.Constants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InventoryReservationEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishInventoryReservation(InventoryReserveEvent event) {
        kafkaTemplate.send(Constants.INVENTORY_RESERVATION_TOPIC, event.getOrderId().toString(), event);
    }
}
