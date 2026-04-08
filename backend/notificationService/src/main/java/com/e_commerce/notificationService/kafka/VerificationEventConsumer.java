package com.e_commerce.notificationService.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.enums.NotificationType;
import com.e_commerce.common.utils.Constants;
import com.e_commerce.notificationService.service.INotificationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VerificationEventConsumer {
    private final INotificationService notificationService;

    @KafkaListener(topics = Constants.EMAIL_VERIFICATION_NOTIFY_TOPIC, groupId = "notification-service-group")
    public void consumeEmailVerificationEvent(ConsumerRecord<String, String> record) {
        String email = record.key();
        String verificationCode = record.value();
        notificationService.sendVerification(NotificationType.EMAIL, email, verificationCode);
    }
}
