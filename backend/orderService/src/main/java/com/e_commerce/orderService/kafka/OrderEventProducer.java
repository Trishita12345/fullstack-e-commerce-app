package com.e_commerce.orderService.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.OrderCreatedEvent;
import com.e_commerce.common.model.event.OrderReservedEvent;
import com.e_commerce.common.utils.Constants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishOrderCreated(OrderCreatedEvent event) {

        kafkaTemplate.send(Constants.ORDER_CREATED_TOPIC, event.getOrderId().toString(), event);
    }

    public void publishOrderReserved(OrderReservedEvent event) {

        kafkaTemplate.send(Constants.ORDER_RESERVED_TOPIC, event.getOrderId().toString(), event);
    }
}
