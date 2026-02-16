package com.e_commerce.common.model.event;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class InventoryReserveEvent {
    private UUID orderId;
    private boolean success;
    private String message;
}
