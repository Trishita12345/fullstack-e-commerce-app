package com.e_commerce.offerService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.e_commerce.offerService.model.Coupon;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ICouponRepository extends JpaRepository<Coupon, UUID> {

    // Find by coupon code
    Optional<Coupon> findByCouponCode(String couponCode);

    // Find active & valid coupon at current time
    Optional<Coupon> findByCouponCodeAndEffectiveFromLessThanEqualAndExpiresOnGreaterThanEqual(
            String couponCode,
            LocalDateTime now1,
            LocalDateTime now2
    );
    @Query(
        value = """
                SELECT *
                FROM coupons
                WHERE effective_from <= CURRENT_TIMESTAMP
                AND expires_on >= CURRENT_TIMESTAMP
                """,
        nativeQuery = true
    )
    List<Coupon> findActiveCoupons();

    // Check existence (useful before creation)
    boolean existsByCouponCode(String couponCode);

    @Query(
        value = """
                SELECT *
                FROM coupons
                WHERE
                coupon_code = :couponCode
                AND effective_from <= CURRENT_TIMESTAMP
                AND expires_on >= CURRENT_TIMESTAMP
                """,
        nativeQuery = true
    )
    Optional<Coupon> getActiveCouponByCouponCode(String couponCode);
}

