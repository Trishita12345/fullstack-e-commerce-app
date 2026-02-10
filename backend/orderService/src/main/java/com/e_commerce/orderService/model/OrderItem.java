package com.e_commerce.orderService.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

import com.e_commerce.common.model.AuditEntity;
import com.e_commerce.orderService.model.enums.OrderItemStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "order_items")
public class OrderItem extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "product_item_id", nullable = false)
    private UUID productItemId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderItemStatus orderItemStatus;

    @Column(nullable = false)
    private Integer quantity;

    private String skuSnapshot;

    private String productName;

    /**
     * Price shown to user (GST inclusive MRP at purchase time)
     */
    @Column(name = "unit_base_price_incl_gst", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitBasePriceIncludingGST;

    /**
     * gst BEFORE coupon allocation
     */
    @Column(name = "unit_selling_price_incl_gst", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitSellingPriceIncludingGST;

    // ================= TAX BREAKUP =================

    /**
     * taxable price BEFORE coupon allocation
     */
    @Column(name = "taxable_value_before_discount", nullable = false, precision = 12, scale = 2)
    private BigDecimal taxableValueBeforeDiscount;

    /**
     * discount allocated to THIS item (very important)
     */
    @Column(name = "discount_allocated", nullable = false, precision = 12, scale = 2)
    private BigDecimal discountAllocated;

    /**
     * taxable value AFTER discount
     */
    @Column(name = "taxable_value_after_discount", nullable = false, precision = 12, scale = 2)
    private BigDecimal taxableValueAfterDiscount;

    /**
     * gst AFTER discount (this is what you actually owe govt)
     */
    @Column(name = "gst_after_discount", nullable = false, precision = 12, scale = 2)
    private BigDecimal gstAfterDiscount;

    /**
     * final amount customer paid for THIS order item * quantity
     * (this is the refund amount)
     */
    @Column(name = "final_item_amount_paid", nullable = false, precision = 12, scale = 2)
    private BigDecimal finalItemAmountPaid;

}
