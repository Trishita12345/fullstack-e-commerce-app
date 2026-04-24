package com.e_commerce.common.model.event;

import java.util.List;
import java.util.UUID;

import com.e_commerce.common.model.dto.notificationDtos.NotificationDTO;
import com.e_commerce.common.model.dto.notificationDtos.OrderItemEmailDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class OrderConfimedNotificationEvent {
    private NotificationDTO config;
    private UUID orderId;
    private List<OrderItemEmailDTO> orderItems;
}
