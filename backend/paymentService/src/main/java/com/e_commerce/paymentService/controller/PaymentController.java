package com.e_commerce.paymentService.controller;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.enums.PaymentGateway;
import com.e_commerce.paymentService.service.IWebhookService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class PaymentController {

    @Value("${payment.razorpay.api-key}")
    private String apiKey;

    @Qualifier("razorpayWebhookService")
    private final IWebhookService webhookService;

    @GetMapping("/{paymentGateway}/key")
    public String getGatewayApiKey(@PathVariable String paymentGateway) {
        if (PaymentGateway.RAZORPAY.name().equalsIgnoreCase(paymentGateway)) {
            return apiKey;
        }
        throw new IllegalArgumentException("Unsupported payment gateway: " + paymentGateway);
    }

    @PostMapping("/public/webhook/razorpay")
    public Void handleRazorpayWebhook(@RequestHeader("X-Razorpay-Signature") String signature,
            @RequestBody String payload) {
        webhookService.processWebhook(payload, signature);
        return null;
    }

}
