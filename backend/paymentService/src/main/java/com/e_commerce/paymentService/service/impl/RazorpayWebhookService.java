package com.e_commerce.paymentService.service.impl;

import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.event.PaymentStatusEvent;
import com.e_commerce.paymentService.kafka.PaymentEventProducer;
import com.e_commerce.paymentService.model.Payment;
import com.e_commerce.paymentService.model.enums.PaymentStatus;
import com.e_commerce.paymentService.repository.IPaymentRepository;
import com.e_commerce.paymentService.service.IWebhookService;
import com.razorpay.Utils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service("razorpayWebhookService")
@RequiredArgsConstructor
public class RazorpayWebhookService implements IWebhookService {

    @Value("${payment.razorpay.webhook-secret}")
    private String webhookSecret;
    private final IPaymentRepository paymentRepository;
    private final PaymentEventProducer paymentEventProducer;

    @Override
    @Transactional
    public void processWebhook(String payload, String signature) {
        verifySignature(payload, signature);
        JSONObject webhookEvent = new JSONObject(payload);
        String eventType = webhookEvent.getString("event");
        switch (eventType) {
            case "payment.captured":
                handlePaymentSuccess(webhookEvent);
                break;
            case "payment.failed":
                handlePaymentFailed(webhookEvent);
                break;
            default:
                // Handle other events if needed
                break;
        }
    }

    private void handlePaymentSuccess(JSONObject webhookEvent) {
        JSONObject paymentDetails = extractPaymentDetails(webhookEvent);
        String razorpayOrderId = paymentDetails.getString("order_id");
        String razorpayPaymentId = paymentDetails.getString("id");
        Optional<Payment> payment = paymentRepository.findByGatewayOrderId(razorpayOrderId);
        payment.ifPresent(p -> {
            p.setPaymentStatus(PaymentStatus.SUCCESS);
            p.setGatewayPaymentId(razorpayPaymentId);
            p.setPaymentMethod("COD"); // TODO: Map Razorpay payment method
            paymentRepository.save(p);
            PaymentStatusEvent event = PaymentStatusEvent.builder()
                    .orderId(p.getOrderId())
                    .paymentStatus(PaymentStatus.SUCCESS.name())
                    .build();
            paymentEventProducer.publishPaymentSuccess(event, p.getId());
        });
    }

    private void handlePaymentFailed(JSONObject webhookEvent) {
        JSONObject paymentDetails = extractPaymentDetails(webhookEvent);
        String razorpayOrderId = paymentDetails.getString("order_id");
        Optional<Payment> payment = paymentRepository.findByGatewayOrderId(razorpayOrderId);
        payment.ifPresent(p -> {
            p.setPaymentStatus(PaymentStatus.FAILED);
            paymentRepository.save(p);
        });
    }

    private JSONObject extractPaymentDetails(JSONObject webhookEvent) {
        return webhookEvent.getJSONObject("payload").getJSONObject("payment").getJSONObject("entity");
    }

    private void verifySignature(String payload, String signature) {
        try {
            Utils.verifyWebhookSignature(payload, signature, webhookSecret);
        } catch (Exception e) {
            throw new RuntimeException("Invalid webhook signature", e);
        }
    }

}
