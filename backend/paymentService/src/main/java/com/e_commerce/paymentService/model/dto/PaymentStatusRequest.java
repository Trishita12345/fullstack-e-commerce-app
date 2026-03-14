package com.e_commerce.paymentService.model.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentStatusRequest {
    private String status;
}
