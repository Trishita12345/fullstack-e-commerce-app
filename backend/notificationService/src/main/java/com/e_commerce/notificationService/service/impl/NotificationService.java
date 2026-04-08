package com.e_commerce.notificationService.service.impl;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.enums.NotificationType;
import com.e_commerce.common.model.event.OrderConfimedNotificationEvent;
import com.e_commerce.notificationService.service.INotificationService;
import com.e_commerce.notificationService.strategy.NotificationStrategyFactory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {

    private final NotificationStrategyFactory notificationStrategyFactory;

    @Async
    @Override
    public void orderConfirmSend(OrderConfimedNotificationEvent request) {
        notificationStrategyFactory.getStrategy(request.getConfig().getType()).orderConfirmSend(request);
    }

    @Override
    public void sendVerification(NotificationType type, String identity, String verificationCode) {
        notificationStrategyFactory.getStrategy(type).sendVerification(identity, verificationCode);
    }
}
