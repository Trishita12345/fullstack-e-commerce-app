package com.e_commerce.seachEngineService.kafka;

import lombok.AllArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.OrderFulfilledEvent;
import com.e_commerce.common.utils.Constants;
import com.e_commerce.seachEngineService.service.IOrderSearchService;

@Service
@AllArgsConstructor
public class OrderFulfilledEventConsumer {

    private final IOrderSearchService orderSearchService;

    @KafkaListener(topics = Constants.ORDER_FULFILLED_TOPIC, groupId = "search-service-group")
    public void consumeOrderFulfilledEvent(OrderFulfilledEvent event) {
        if (event.getOrderStatus().equalsIgnoreCase("CONFIRMED")) {
            orderSearchService.updateProductAndOrderIndexForConfirmedOrder(event);
        }
    }
}
