package com.e_commerce.orderService.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

import com.e_commerce.common.model.AuditEntity;
import com.e_commerce.common.model.enums.PaymentGateway;
import com.e_commerce.common.model.enums.PaymentMode;
import com.e_commerce.orderService.model.enums.OrderStatus;
import com.e_commerce.orderService.model.enums.PaymentStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "orders")
public class Order extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "order_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Column(name = "payment_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Column(name = "items_total_mrp", nullable = false, precision = 12, scale = 2)
    private BigDecimal itemsTotalMrp;

    @Column(name = "items_total_mrp_after_discount", nullable = false, precision = 12, scale = 2)
    private BigDecimal itemsTotalMrpAfterDiscount;

    @Column(name = "coupon_discount", nullable = false, precision = 12, scale = 2)
    private BigDecimal couponDiscount;

    @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    private String couponCode;

    @Column(name = "payment_mode", nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

    @Column(name = "payment_gateway")
    @Enumerated(EnumType.STRING)
    private PaymentGateway paymentGateway;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<OrderItem> orderItems;

    private String transactionId;
    private String gatewayOrderId;

    private String deliveryName;
    private String deliveryAddressDetails;
    private String contactNumber;
}
