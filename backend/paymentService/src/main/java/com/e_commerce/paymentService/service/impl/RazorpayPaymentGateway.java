package com.e_commerce.paymentService.service.impl;

import java.math.BigDecimal;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.e_commerce.common.exception.BaseException;
import com.e_commerce.paymentService.model.dto.GatewayOrderResponse;
import com.e_commerce.paymentService.service.IPaymentGateway;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service("razorpayGateway")
public class RazorpayPaymentGateway implements IPaymentGateway {

    private final RazorpayClient razorpayClient;

    @Override
    public GatewayOrderResponse createOrder(String orderId, BigDecimal amount) {
        JSONObject request = new JSONObject();
        request.put("amount", amount.multiply(BigDecimal.valueOf(100))); // Convert to paise
        request.put("currency", "INR");
        request.put("receipt", orderId);
        try {
            Order order = razorpayClient.orders.create(request);
            return GatewayOrderResponse.builder()
                    .gatewayOrderId(order.get("id").toString())
                    .status(order.get("status").toString())
                    .gatewayName("Razorpay")
                    .build();
        } catch (Exception e) {
            throw new BaseException("Error occurred while creating Razorpay order", HttpStatus.INTERNAL_SERVER_ERROR,
                    "RAZORPAY_ORDER_CREATION_FAILED");
        }
    }

}
