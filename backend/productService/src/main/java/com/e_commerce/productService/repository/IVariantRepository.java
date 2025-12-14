package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.Variant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IVariantRepository extends JpaRepository<Variant, UUID> {

    // Variants applicable for a category (filters)
    List<Variant> findByCategory_Id(UUID categoryId);
}

