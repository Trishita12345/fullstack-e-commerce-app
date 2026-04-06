package com.e_commerce.notificationService.strategy;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.e_commerce.common.model.enums.NotificationType;

@Component
public class NotificationStrategyFactory {

    private final Map<NotificationType, NotificationStrategy> strategies;

    public NotificationStrategyFactory(List<NotificationStrategy> strategyList) {
        this.strategies = strategyList.stream()
                .collect(Collectors.toMap(
                        NotificationStrategy::getType,
                        Function.identity()));
    }

    public NotificationStrategy getStrategy(NotificationType type) {
        return strategies.get(type);
    }
}
