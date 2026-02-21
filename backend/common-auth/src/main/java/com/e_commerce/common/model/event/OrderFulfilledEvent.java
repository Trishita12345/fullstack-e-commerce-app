package com.e_commerce.common.model.event;

import java.util.List;
import java.util.UUID;

import com.e_commerce.common.model.dto.CartItemDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder

public class OrderFulfilledEvent {
    private UUID orderId;
    private String orderStatus;
    private List<CartItemDTO> items;
    private String userId;
}
