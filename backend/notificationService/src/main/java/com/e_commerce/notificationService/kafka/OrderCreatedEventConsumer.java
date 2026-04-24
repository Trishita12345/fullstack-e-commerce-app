package com.e_commerce.notificationService.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.OrderConfimedNotificationEvent;
import com.e_commerce.common.utils.Constants;
import com.e_commerce.notificationService.service.INotificationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderCreatedEventConsumer {

    private final INotificationService notificationService;

    @KafkaListener(topics = Constants.ORDER_CONFIRMED_FOR_NOTIFY_TOPIC, groupId = "notification-service-group")
    public void consumePaymentCreatedEvent(OrderConfimedNotificationEvent event) {
        notificationService.orderConfirmSend(event);
    }

}
