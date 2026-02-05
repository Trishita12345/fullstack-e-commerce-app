package com.e_commerce.common.model.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CartItemDTO {
    private UUID productItemId;
    private Integer quantity;
}
