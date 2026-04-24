package com.e_commerce.notificationService.service;

import com.e_commerce.common.model.enums.NotificationType;
import com.e_commerce.common.model.event.OrderConfimedNotificationEvent;

public interface INotificationService {
    void orderConfirmSend(OrderConfimedNotificationEvent request);

    void sendVerification(NotificationType type, String identity, String verificationCode);
}
