package com.e_commerce.paymentService.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.enums.PaymentGateway;
import com.e_commerce.paymentService.model.dto.PaymentResponse;
import com.e_commerce.paymentService.model.dto.PaymentStatusRequest;
import com.e_commerce.paymentService.service.IPaymentService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    @Value("${payment.razorpay.api-key}")
    private String apiKey;

    private final IPaymentService paymentService;

    @GetMapping("/order/{orderId}")
    public ResponseEntity<PaymentResponse> getPaymentByOrderId(@PathVariable UUID orderId) {
        PaymentResponse response = paymentService.getPaymentByOrderId(orderId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{paymentId}/status")
    public ResponseEntity<PaymentResponse> getPaymentByOrderId(@PathVariable UUID paymentId,
            @RequestBody PaymentStatusRequest paymentStatusRequest) {
        PaymentResponse response = paymentService.updatePaymentStatus(paymentId, paymentStatusRequest.getStatus());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{paymentGateway}/key")
    public String getGatewayApiKey(@PathVariable String paymentGateway) {
        if (PaymentGateway.RAZORPAY.name().equalsIgnoreCase(paymentGateway)) {
            return apiKey;
        }
        throw new IllegalArgumentException("Unsupported payment gateway: " + paymentGateway);
    }

}
