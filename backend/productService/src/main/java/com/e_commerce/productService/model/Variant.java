package com.e_commerce.productService.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

import com.e_commerce.common.model.AuditEntity;

@Getter
@Setter
@Entity
@Table(name = "variants")
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Variant extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VariantAttribute> attributes;
}
