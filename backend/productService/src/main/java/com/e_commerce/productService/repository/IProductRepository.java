package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IProductRepository extends JpaRepository<Product, UUID> {

    // All products under a category (paginated)
    Page<Product> findByCategory_Id(UUID categoryId, Pageable pageable);

}

