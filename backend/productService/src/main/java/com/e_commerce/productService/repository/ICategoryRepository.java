package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, UUID> {

    // Top-level categories (Aromatherapy, Home Decor, etc.)
    List<Category> findByParentCategoryIsNull();

    // Sub-categories of a parent (Candles, Incense Sticks)
    List<Category> findByParentCategory_Id(UUID parentCategoryId);

    Optional<Category> findByName(String name);
}
