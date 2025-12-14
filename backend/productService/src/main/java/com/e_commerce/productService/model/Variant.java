package com.e_commerce.productService.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;


@Getter
@Setter
@Entity
@Table(name = "variants")
@NoArgsConstructor
public class Variant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL)
    private List<VariantAttribute> attributes;
}
