package com.e_commerce.orderService.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.e_commerce.orderService.model.Order;

import java.util.List;
import java.util.UUID;

public interface IOrderRepository extends JpaRepository<Order, UUID> {

    List<Order> findByUserId(UUID userId);
}

