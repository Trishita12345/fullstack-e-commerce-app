package com.e_commerce.productService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

import com.e_commerce.common.model.AuditEntity;

@Getter
@Setter
@Entity
@Table(name = "categories")
@NoArgsConstructor
public class Category extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = true)
    private String imgUrl;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "parentCategory")
    private Category parentCategory;

    @OneToMany(mappedBy = "parentCategory")
    private List<Category> subCategories;

    @OneToMany(mappedBy = "category")
    private List<Product> products;

    @OneToMany(mappedBy = "category")
    private List<Variant> variants;

}
