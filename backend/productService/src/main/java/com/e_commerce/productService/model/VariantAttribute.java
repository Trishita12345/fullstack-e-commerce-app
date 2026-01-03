package com.e_commerce.productService.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "variantAttributes")
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class VariantAttribute extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "variantId", nullable = false)
    private Variant variant;

    @ManyToMany(mappedBy = "variantAttributes")
    private Set<ProductItem> productItems;
}
