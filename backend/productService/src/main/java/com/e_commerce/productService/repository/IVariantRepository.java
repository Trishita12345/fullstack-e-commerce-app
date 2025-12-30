package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.Variant;
import com.e_commerce.productService.model.dto.variant.VariantWithCategoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IVariantRepository extends JpaRepository<Variant, UUID> {

    // Variants applicable for a category (filters)
    List<Variant> findByCategory_Id(UUID categoryId);

    @Query(
            value = """
                        SELECT v.id, v.name, c.id, c.name
                        FROM variants v
                        JOIN categories c ON v.category_id = c.id
                        WHERE c.id IN (:categoryIds)
                    """,
            nativeQuery = true
    )
    Page<VariantWithCategoryDTO> findVariantsByCategoryIds(
            @Param("categoryIds") List<UUID> categoryIds, Pageable pageable
    );

    @Query(
            value = """
                    SELECT v.id   AS variantId,
                        v.name AS variantName,
                        c.id   AS categoryId,
                        c.name AS categoryName
                    FROM variants v
                    JOIN categories c ON v.category_id = c.id
                    WHERE c.id IN (:categoryIds)
                      AND (
                          LOWER(v.name) LIKE LOWER(CONCAT('%', :query, '%'))
                          OR LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%'))
                      )
                    """,
            nativeQuery = true
    )
    Page<VariantWithCategoryDTO> findByNameContainingIgnoreCaseByCategoryIds(
            @Param("query") String query,
            @Param("categoryIds") List<UUID> categoryIds,
            Pageable pageable
    );

    @Query(
            value = """
                    SELECT
                        v.id           AS variant_id,
                        v.name         AS variant_name,
                        va.id           AS attribute_id,
                        va.name         AS attribute_name
                    FROM variants v
                    JOIN categories c ON v.category_id = c.id
                    JOIN variant_attributes va ON va.variant_id = v.id
                    WHERE c.id IN (:categoryIds)
                    """,
            nativeQuery = true
    )
    List<Object[]> findVariantAttributesByCategoryIds(List<UUID> categoryIds);

}

