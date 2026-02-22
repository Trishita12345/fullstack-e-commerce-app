package com.e_commerce.orderService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e_commerce.orderService.model.Order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface IOrderRepository extends JpaRepository<Order, UUID> {

    List<Order> findByUserId(UUID userId);

    @Query(value = "SELECT * FROM orders WHERE order_status = 'RESERVED' AND created_at < :cutoffTime", nativeQuery = true)
    List<Order> expireReservations(LocalDateTime cutoffTime);
}
