package com.e_commerce.paymentService.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.paymentService.model.dto.PaymentResponse;
import com.e_commerce.paymentService.model.dto.PaymentStatusRequest;
import com.e_commerce.paymentService.service.IPaymentService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/payments")
@AllArgsConstructor
public class PaymentController {

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

}
