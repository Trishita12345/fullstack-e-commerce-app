package com.e_commerce.productService.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import com.e_commerce.common.model.AuditEntity;

@Getter
@Setter
@Entity
@Table(name = "productItemImages")
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ProductItemImage extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String imgUrl;

    @Column(nullable = false)
    private Boolean isThumbnail;

    @ManyToOne
    @JoinColumn(name = "productItemId", nullable = false)
    private ProductItem productItem;

}
