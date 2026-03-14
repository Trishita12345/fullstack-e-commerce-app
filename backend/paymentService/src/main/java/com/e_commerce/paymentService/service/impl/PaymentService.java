package com.e_commerce.paymentService.service.impl;

import com.e_commerce.common.model.event.OrderReservedEvent;
import com.e_commerce.common.model.event.PaymentCreatedEvent;
import com.e_commerce.paymentService.kafka.PaymentEventProducer;
import com.e_commerce.paymentService.model.Payment;
import com.e_commerce.paymentService.model.dto.GatewayOrderResponse;
import com.e_commerce.paymentService.model.dto.PaymentResponse;
import com.e_commerce.paymentService.model.enums.PaymentStatus;
import com.e_commerce.paymentService.repository.IPaymentRepository;
import com.e_commerce.paymentService.service.IPaymentGateway;
import com.e_commerce.paymentService.service.IPaymentService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PaymentService implements IPaymentService {

    private final IPaymentRepository paymentRepository;
    private final PaymentEventProducer paymentEventProducer;

    @Qualifier("razorpayGateway")
    private final IPaymentGateway paymentGateway;

    private String generateTransactionId() {
        // Example: TXN-9f1c2d4a7c3e4b2a
        return "TXN-" + UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 16)
                .toUpperCase();
    }

    @Override
    @Transactional
    public void createPayment(OrderReservedEvent orderReservedEvent) {
        if (paymentRepository.findByOrderId(orderReservedEvent.getOrderId()).isPresent()) {
            return; // Payment already exists for this order, skip processing
        }

        GatewayOrderResponse gatewayOrderResponse = paymentGateway
                .createOrder(orderReservedEvent.getOrderId().toString(), orderReservedEvent.getAmount());
        Payment payment = Payment.builder()
                .orderId(orderReservedEvent.getOrderId())
                .amount(orderReservedEvent.getAmount())
                .userId(orderReservedEvent.getUserId())
                .paymentStatus(PaymentStatus.INITIATED)
                .gatewayOrderId(gatewayOrderResponse.getGatewayOrderId())
                .gateway(orderReservedEvent.getPaymentGateway())
                .transactionId(generateTransactionId())
                .build();
        Payment savedPayment = paymentRepository.save(payment);
        PaymentCreatedEvent paymentCreatedEvent = PaymentCreatedEvent.builder()
                .paymentId(savedPayment.getId())
                .orderId(savedPayment.getOrderId())
                .transactionId(savedPayment.getTransactionId())
                .gatewayOrderId(savedPayment.getGatewayOrderId())
                .build();
        paymentEventProducer.publishPaymentCreated(paymentCreatedEvent);
    }

    private PaymentResponse mapToResponse(Payment savedPayment) {
        return PaymentResponse.builder()
                .paymentId(savedPayment.getId())
                .orderId(savedPayment.getOrderId())
                .amount(savedPayment.getAmount())
                .paymentStatus(savedPayment.getPaymentStatus())
                .transactionId(savedPayment.getTransactionId())
                .build();
    }

    @Override
    public PaymentResponse getPaymentByOrderId(UUID orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for orderId: " + orderId));
        return mapToResponse(payment);
    }

    @Override
    @Transactional
    public PaymentResponse updatePaymentStatus(UUID paymentId, String status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found for paymentId: " + paymentId));
        payment.setPaymentStatus(PaymentStatus.valueOf(status.toUpperCase()));
        Payment updatedPayment = paymentRepository.save(payment);
        return mapToResponse(updatedPayment);
    }

}
