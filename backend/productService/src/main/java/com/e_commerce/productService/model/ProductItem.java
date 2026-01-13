package com.e_commerce.productService.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "productItems")
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ProductItem extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String sku;

    private Integer availableStock;

    private BigDecimal basePrice;

    private BigDecimal discountedPrice;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    @OneToMany(mappedBy = "productItem", cascade = CascadeType.ALL)
    private Set<ProductItemImage> images;

    @ManyToMany
    @JoinTable(name = "productItemVariantAttributes", joinColumns = @JoinColumn(name = "productItemId"), inverseJoinColumns = @JoinColumn(name = "variantAttributeId"))
    private Set<VariantAttribute> variantAttributes;
}
