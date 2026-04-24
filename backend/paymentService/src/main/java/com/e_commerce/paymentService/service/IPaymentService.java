package com.e_commerce.paymentService.service;

import java.util.UUID;

import com.e_commerce.common.model.event.OrderReservedEvent;
import com.e_commerce.paymentService.model.dto.PaymentResponse;

public interface IPaymentService {
    void createPayment(OrderReservedEvent orderReservedEvent);

    PaymentResponse getPaymentByOrderId(UUID orderId);

    PaymentResponse updatePaymentStatus(UUID paymentId, String status);
}
