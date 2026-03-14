package com.e_commerce.paymentService.kafka;

import com.e_commerce.paymentService.service.IPaymentService;

import lombok.AllArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.OrderReservedEvent;
import com.e_commerce.common.utils.Constants;

@Service
@AllArgsConstructor
public class OrderReservedEventConsumer {

    private final IPaymentService paymentService;

    @KafkaListener(topics = Constants.ORDER_RESERVED_TOPIC, groupId = "payment-service-group")
    public void consumeOrderReservedEvent(OrderReservedEvent event) {
        paymentService.createPayment(event);
    }
}
