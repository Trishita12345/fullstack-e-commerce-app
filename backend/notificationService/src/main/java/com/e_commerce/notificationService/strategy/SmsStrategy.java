package com.e_commerce.notificationService.strategy;

import org.springframework.stereotype.Component;
import com.e_commerce.common.model.event.OrderConfimedNotificationEvent;
import com.e_commerce.common.model.enums.NotificationType;

@Component
public class SmsStrategy implements NotificationStrategy {
    @Override
    public void orderConfirmSend(OrderConfimedNotificationEvent request) {
        // SMS logic
    }

    @Override
    public NotificationType getType() {
        return NotificationType.SMS;
    }

    @Override
    public void sendVerification(String identity, String verificationCode) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'sendVerification'");
    }
}
