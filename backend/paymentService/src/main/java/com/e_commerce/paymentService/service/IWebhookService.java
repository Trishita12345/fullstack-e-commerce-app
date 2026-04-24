package com.e_commerce.paymentService.service;

public interface IWebhookService {
    void processWebhook(String payload, String signature);
}
