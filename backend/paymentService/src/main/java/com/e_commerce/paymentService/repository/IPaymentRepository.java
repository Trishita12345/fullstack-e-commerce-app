package com.e_commerce.paymentService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e_commerce.paymentService.model.Payment;

import java.util.Optional;
import java.util.UUID;

public interface IPaymentRepository extends JpaRepository<Payment, UUID> {

    Optional<Payment> findByOrderId(UUID orderId);

    Optional<Payment> findByTransactionId(String transactionId);
}
