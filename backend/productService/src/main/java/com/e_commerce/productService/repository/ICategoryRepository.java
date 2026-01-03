package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, UUID> {

  List<Category> findByNameIn(List<String> categories);

  // Top-level categories (Aromatherapy, Home Decor, etc.)
  List<Category> findByParentCategoryIsNull();

  // Sub-categories of a parent (Candles, Incense Sticks)
  List<Category> findByParentCategory_Id(UUID parentCategoryId);

  Optional<Category> findByName(String name);

  @Query(value = """
      SELECT c.*
        FROM categories c
         left JOIN products p
          ON c.id = p.category_id
        WHERE p.id IS NULL
      """, nativeQuery = true)
  List<Category> findCategoriesWithNoProducts();

  @Query(value = """
      SELECT c.*
       FROM categories c
       LEFT JOIN categories cc
         ON cc.parent_category = c.id
       WHERE cc.id IS NULL
      """, nativeQuery = true)
  List<Category> findCategoriesWithNoChildCategories();

  Page<Category> findByNameContainingIgnoreCase(String query, Pageable pageable);

  // @Query(value = """
  // SELECT NOT EXISTS (
  // SELECT 1
  // FROM products p
  // WHERE p.category_id = :categoryId
  // )
  // """, nativeQuery = true)
  // boolean isCategoryParent(@Param("categoryId") UUID categoryId);
}
