package com.e_commerce.common.model.dto.notificationDtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemEmailDTO {
    private String sku;
    private UUID productItemId;
    private String productName;
    private String productImg;
    private Integer quantity;
}
