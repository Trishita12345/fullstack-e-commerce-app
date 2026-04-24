package com.e_commerce.cartService.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e_commerce.cartService.model.Cart;

public interface ICartRepository extends JpaRepository<Cart, UUID> {

    Optional<Cart> findByUserId(String userId);
}
