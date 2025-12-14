package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.ProductItemImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IProductItemImageRepository extends JpaRepository<ProductItemImage, UUID> {

    List<ProductItemImage> findByProductItem_Id(UUID productItemId);
}
