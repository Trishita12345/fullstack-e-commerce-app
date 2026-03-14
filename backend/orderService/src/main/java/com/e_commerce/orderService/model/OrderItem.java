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

    @Column(name = "product_item_thumbnail_image", nullable = false)
    private String productItemThumbnailImage;

    @Column(name = "product_item_id", nullable = false)
    private UUID productItemId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderItemStatus orderItemStatus;

    @Column(nullable = false)
    private Integer quantity;

    private String skuSnapshot;

    private String productName;

    private BigDecimal cgst;

    private BigDecimal sgst;

    @Column(name = "unit_base_price_incl_gst", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitBasePriceIncludingGST;

    @Column(name = "unit_selling_price_incl_gst", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitSellingPriceIncludingGST;

    @Column(name = "unit_coupon_discount_allocated", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitCouponDiscountAllocated;

    @Column(name = "unit_taxable_value_after_discount", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitTaxableValueAfterDiscount;

    @Column(name = "unit_cgst_after_discount", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitCgstAfterDiscount;

    @Column(name = "unit_sgst_after_discount", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitSgstAfterDiscount;

    @Column(name = "unit_total_gst_after_discount", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitTotalGstAfterDiscount;

    @Column(name = "unit_final_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal unitFinalAmount;

    @Column(name = "total_final_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalFinalAmount;

}
