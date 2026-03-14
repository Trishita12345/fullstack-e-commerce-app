package com.e_commerce.paymentService.kafka;

import java.util.UUID;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.PaymentCreatedEvent;
import com.e_commerce.common.model.event.PaymentStatusEvent;
import com.e_commerce.common.utils.Constants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PaymentEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishPaymentCreated(PaymentCreatedEvent event) {

        kafkaTemplate.send(Constants.PAYMENT_CREATED_TOPIC, event.getPaymentId().toString(), event);
    }

    public void publishPaymentSuccess(PaymentStatusEvent event, UUID paymentId) {

        kafkaTemplate.send(Constants.PAYMENT_SUCCESS_TOPIC, paymentId.toString(), event);
    }
}
