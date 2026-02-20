package com.e_commerce.paymentService.service;

import java.math.BigDecimal;

import com.e_commerce.paymentService.model.dto.GatewayOrderResponse;

public interface IPaymentGateway {
    GatewayOrderResponse createOrder(String orderId, BigDecimal amount);
}
