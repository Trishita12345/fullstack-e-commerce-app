package com.e_commerce.productService.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "productsItem")
@NoArgsConstructor
public class ProductItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String sku;

    private Integer availableStock;

    private BigDecimal basePrice;

    private BigDecimal discountedPrice;

    @ManyToOne
    @JoinColumn(name = "productsId", nullable = false)
    private Product product;

    @OneToMany(mappedBy = "productItem", cascade = CascadeType.ALL)
    private List<ProductItemImage> images;

    @ManyToMany
    @JoinTable(
            name = "productsItemVariantAttributes",
            joinColumns = @JoinColumn(name = "productsItemId"),
            inverseJoinColumns = @JoinColumn(name = "variantAttributesId")
    )
    private Set<VariantAttribute> variantAttributes;
}

