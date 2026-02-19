package com.e_commerce.paymentService.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.PaymentCreatedEvent;
import com.e_commerce.common.utils.Constants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PaymentCreatedEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishPaymentCreated(PaymentCreatedEvent event) {

        kafkaTemplate.send(Constants.PAYMENT_CREATED_TOPIC, event.getPaymentId().toString(), event);
    }
}
