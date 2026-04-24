package com.e_commerce.paymentService.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GatewayOrderResponse {
    private String gatewayOrderId;
    private String status;
    private String gatewayName;
}
