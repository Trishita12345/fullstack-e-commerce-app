package com.e_commerce.common.model.event;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.e_commerce.common.model.dto.CartItemDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderCreatedEvent {

    private UUID orderId;
    private String userId;
    private BigDecimal amount;
    private List<CartItemDTO> items;
}
