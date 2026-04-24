package com.e_commerce.cartService.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e_commerce.cartService.model.Wishlisted;

public interface IWishlistedRepository extends JpaRepository<Wishlisted, UUID> {

    List<Wishlisted> findByUserId(String userId);

    Optional<Wishlisted> findByUserIdAndProductItemId(String userId, UUID productItemId);

}
