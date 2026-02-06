package com.e_commerce.offerService.model;

import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.UuidGenerator;

import com.e_commerce.common.model.AuditEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "coupons")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coupon extends AuditEntity {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "coupon_code", nullable = false, unique = true, length = 50)
    private String couponCode;

    @Column(name = "discount_percent", nullable = false)
    private Integer discountPercent;

    @Column(name = "min_purchase_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal minPurchaseAmount;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "effective_from", nullable = false)
    private LocalDateTime effectiveFrom;

    @Column(name = "expires_on", nullable = false)
    private LocalDateTime expiresOn;

    /**
     * Dynamic JSON conditions for future predicate evaluation
     * Example:
     * {
     *   "paymentMode": "PREPAID",
     *   "maxDiscountAmount": 500
     * }
     */
    @Column(name = "conditions", columnDefinition = "json")
    private String conditions;
}
