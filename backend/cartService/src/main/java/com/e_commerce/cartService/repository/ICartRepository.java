package com.e_commerce.cartService.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e_commerce.cartService.model.Cart;
import com.e_commerce.cartService.model.enums.CartStatus;

public interface ICartRepository extends JpaRepository<Cart, UUID> {

    Optional<Cart> findByUserIdAndStatus(String userId, CartStatus status);
}
