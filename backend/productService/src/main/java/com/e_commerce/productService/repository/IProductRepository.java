package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.Product;
import com.e_commerce.productService.model.dto.product.ProductListingResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IProductRepository extends JpaRepository<Product, UUID> {

    // All products under a category (paginated)
    Page<Product> findByCategory_Id(UUID categoryId, Pageable pageable);

    @Query(
            value = """
                    SELECT P.ID, P.NAME, C.NAME FROM PRODUCTS P  JOIN CATEGORIES C ON P.CATEGORY_ID = C.ID
                    WHERE
                    (:query IS NULL OR LOWER(P.name) LIKE LOWER(CONCAT('%', :query, '%')))
                    AND
                    (:categories IS NULL OR C.NAME IN (:categories))
                    """,
            nativeQuery = true
    )
    Page<ProductListingResponseDTO> findAllProducts(String query, List<String> categories, Pageable pageable);
}

