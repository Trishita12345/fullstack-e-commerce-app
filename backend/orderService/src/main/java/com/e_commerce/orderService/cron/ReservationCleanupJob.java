package com.e_commerce.orderService.cron;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.e_commerce.common.model.dto.CartItemDTO;
import com.e_commerce.common.model.event.OrderFulfilledEvent;
import com.e_commerce.orderService.kafka.OrderEventProducer;
import com.e_commerce.orderService.model.Order;
import com.e_commerce.orderService.model.enums.OrderItemStatus;
import com.e_commerce.orderService.model.enums.OrderStatus;
import com.e_commerce.orderService.repository.IOrderRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ReservationCleanupJob {

    private final IOrderRepository orderRepository;
    private final OrderEventProducer orderEventProducer;

    @Scheduled(fixedRate = 5 * 60 * 1000) // every 5 minutes
    @Transactional
    public void expireReservations() {
        List<Order> expiredOrders = orderRepository.expireReservations(LocalDateTime.now().minusMinutes(15));
        for (Order order : expiredOrders) {
            order.setOrderStatus(OrderStatus.FAILED);
            order.getOrderItems().forEach(item -> item.setOrderItemStatus(OrderItemStatus.FAILED));
            orderRepository.save(order);
            OrderFulfilledEvent orderFulfilledEvent = OrderFulfilledEvent.builder()
                    .orderId(order.getId())
                    .orderStatus(OrderStatus.FAILED.name())
                    .userId(order.getUserId())
                    .build();
            List<CartItemDTO> items = order.getOrderItems().stream()
                    .map(item -> CartItemDTO.builder()
                            .productItemId(item.getProductItemId())
                            .quantity(item.getQuantity())
                            .build())
                    .toList();
            orderFulfilledEvent.setItems(items);
            orderEventProducer.publishOrderFulfilled(orderFulfilledEvent);
        }

    }
}
