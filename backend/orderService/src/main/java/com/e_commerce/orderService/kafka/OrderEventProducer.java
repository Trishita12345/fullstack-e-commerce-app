package com.e_commerce.orderService.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.OrderCreatedEvent;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    private static final String TOPIC = "order-created";

    public void publishOrderCreated(OrderCreatedEvent event) {

        kafkaTemplate.send(TOPIC, event.getOrderId().toString(), event);
    }
}
