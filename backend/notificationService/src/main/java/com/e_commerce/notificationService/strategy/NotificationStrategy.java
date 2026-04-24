package com.e_commerce.notificationService.strategy;

import com.e_commerce.common.model.event.OrderConfimedNotificationEvent;
import com.e_commerce.common.model.enums.NotificationType;

public interface NotificationStrategy {

    NotificationType getType();

    void orderConfirmSend(OrderConfimedNotificationEvent request);

    void sendVerification(String identity, String verificationCode);
}