package com.e_commerce.orderService.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.PaymentCreatedEvent;
import com.e_commerce.common.model.event.PaymentStatusEvent;
import com.e_commerce.common.utils.Constants;
import com.e_commerce.orderService.service.IOrderService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PaymentEventConsumer {

    private final IOrderService orderService;

    @KafkaListener(topics = Constants.PAYMENT_CREATED_TOPIC, groupId = "order-service-group")
    public void consumePaymentCreatedEvent(PaymentCreatedEvent event) {
        orderService.updatePaymentInitiated(event);
    }

    @KafkaListener(topics = Constants.PAYMENT_SUCCESS_TOPIC, groupId = "order-service-group")
    public void consumePaymentSuccessEvent(PaymentStatusEvent event) {
        orderService.updatePaymentSuccess(event);
    }
}
