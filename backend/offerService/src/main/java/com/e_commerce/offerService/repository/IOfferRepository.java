package com.e_commerce.offerService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.e_commerce.offerService.model.Offer;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IOfferRepository extends JpaRepository<Offer, UUID> {

    // Find by coupon code
    Optional<Offer> findByCouponCode(String couponCode);

    // Find active & valid coupon at current time
    Optional<Offer> findByCouponCodeAndEffectiveFromLessThanEqualAndExpiresOnGreaterThanEqual(
            String couponCode,
            LocalDateTime now1,
            LocalDateTime now2
    );
    @Query(
        value = """
                SELECT *
                FROM offers
                WHERE effective_from <= CURRENT_TIMESTAMP
                AND expires_on >= CURRENT_TIMESTAMP
                """,
        nativeQuery = true
    )
    List<Offer> findActiveCoupons();

    // Check existence (useful before creation)
    boolean existsByCouponCode(String couponCode);
}

