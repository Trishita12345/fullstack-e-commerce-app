package com.e_commerce.cartService.kafka;

import lombok.AllArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.e_commerce.cartService.service.ICartItemService;
import com.e_commerce.common.model.event.OrderFulfilledEvent;
import com.e_commerce.common.utils.Constants;

@Service
@AllArgsConstructor
public class OrderFulfilledConsumer {

    private final ICartItemService cartItemService;

    @KafkaListener(topics = Constants.ORDER_FULFILLED_TOPIC, groupId = "cart-service-group")
    public void consumeOrderFulfilledEvent(OrderFulfilledEvent event) {
        if (event.getOrderStatus().equalsIgnoreCase("CONFIRMED")) {
            cartItemService.removeCartItems(event.getItems(), event.getUserId());
        }
    }
}
