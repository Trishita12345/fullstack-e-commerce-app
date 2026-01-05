package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.ProductItem;
import com.e_commerce.productService.model.dto.productItem.ProductItemFilter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.JpqlQueryBuilder.Select;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IProductItemRepository extends JpaRepository<ProductItem, UUID> {

    Optional<ProductItem> findBySku(String sku);

    // All SKUs for a product
    List<ProductItem> findByProduct_Id(UUID productId);

    // // PLP Page
    // @Query("""
    // select distinct pi
    // from ProductItem pi
    // left join fetch pi.images
    // left join fetch pi.variantAttributes
    // """)
    // Page<ProductItem> findAllItemsWithImagesWithVariantAttributes(Pageable
    // pageable);

    // Fetch items with images and variants using query -- PDP page
    @Query("""
                select distinct pi
                from ProductItem pi
                left join fetch pi.images
                left join fetch pi.variantAttributes
                where pi.product.id = :productId
            """)
    Page<ProductItem> findItemsWithImagesWithVariantAttributesByProductId(@Param("productId") UUID productId,
            Pageable pageable);

    @Query("""
            SELECT pi FROM ProductItem pi
            LEFT JOIN FETCH pi.variantAttributes va
            LEFT JOIN FETCH va.variant
            LEFT JOIN FETCH pi.images
            WHERE pi.id = :id
            """)
    Optional<ProductItem> findWithDetails(UUID id);

    @Query(value = """
            SELECT
            t.id as productItemId,
            t.sku as sku,
            t.updated_at as updatedAt,
            t.available_stock as availableStock,
            t.discounted_price as discountedPrice,
            t.base_price as basePrice,
            t.img_url as imgUrl,
            t.attributes as attributes
            from (
                SELECT
                    pi.id,
                    pi.sku,
                    pi.available_stock,
                    pi.base_price,
                    pi.discounted_price,
                    pii.img_url,
                    pi.updated_at,
                    STRING_AGG(DISTINCT va.name, ',') as attributes
                FROM  product_items pi
                left join product_item_variant_attributes piva ON pi.id = piva.product_item_id
                left JOIN variant_attributes va ON piva.variant_attribute_id = va.id
                JOIN products p ON pi.product_id = p.id
                LEFT JOIN product_item_images pii
                       ON pii.product_item_id = pi.id
                      AND pii.is_thumbnail = true or pii.is_thumbnail is NULL
                WHERE
                        p.id = :productId
                        AND pi.discounted_price BETWEEN :minPrice AND :maxPrice
                        AND (
                            :applyFilters = false
                            OR EXISTS (
                                SELECT 1
                                FROM product_item_variant_attributes piva2
                                JOIN variant_attributes va2
                                    ON piva2.variant_attribute_id = va2.id
                                WHERE
                                    piva2.product_item_id = pi.id
                                    AND va2.name IN :filtersList
                            )
                        )
                GROUP BY
                    pi.id,
                    pi.sku,
                    pi.available_stock,
                    pi.base_price,
                    pi.discounted_price,
                    pi.updated_at,
                    pii.img_url
                ) as t
                                """, countQuery = """
                SELECT COUNT(DISTINCT pi.id)
                FROM product_items pi
                JOIN products p ON pi.product_id = p.id
                WHERE
                    p.id = :productId
                    AND pi.discounted_price BETWEEN :minPrice AND :maxPrice
                    AND (
                        :applyFilters = false
                        OR EXISTS (
                            SELECT 1
                            FROM product_item_variant_attributes piva2
                            JOIN variant_attributes va2
                                ON piva2.variant_attribute_id = va2.id
                            WHERE
                                piva2.product_item_id = pi.id
                                AND va2.name IN :filtersList
                        )
                    )
            """, nativeQuery = true)
    Page<ProductItemFilter> findProductItemsPage(
            @Param("productId") UUID productId,
            @Param("filtersList") List<String> filtersList,
            @Param("applyFilters") boolean applyFilters,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable);

    boolean existsBySku(String sku);
}