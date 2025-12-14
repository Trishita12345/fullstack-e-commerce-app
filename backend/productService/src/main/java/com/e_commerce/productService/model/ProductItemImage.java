package com.e_commerce.productService.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "productsItemImages")
@NoArgsConstructor
public class ProductItemImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "productsItemId", nullable = false)
    private ProductItem productItem;
}

