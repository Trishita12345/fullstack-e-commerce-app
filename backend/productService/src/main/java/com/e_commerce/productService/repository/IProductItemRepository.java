package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.ProductItem;
import com.e_commerce.productService.model.dto.customer.CartProductItemInfoResponse;
import com.e_commerce.productService.model.dto.customer.ProductDetailsDTO;
import com.e_commerce.productService.model.dto.productItem.ProductItemFilter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    @Query(value = """
                        select
            c.name as categoryName,
            p.name as productName,
            p.id as productId,
            p.description as description,
            p.features as feature,
            CAST(pi.base_price AS DOUBLE PRECISION) as basePrice,
            CAST(pi.discounted_price AS DOUBLE PRECISION)  as discountedPrice,
            CAST(pi.available_stock AS INTEGER) as availableStock,
            CAST(4.5 AS DOUBLE PRECISION) as rating,
            CAST(268 AS INTEGER) as noOfReviews
            from product_items pi
            join products p on p.id = pi.product_id
            join categories c ON c.id = p.category_id
            where pi.id = :productItemId
                        """, nativeQuery = true)
    ProductDetailsDTO findProductDetailsById(UUID productItemId);

    @Query(value = """
            select v.name,va.name,pi.id
            from product_items pi
            join product_item_variant_attributes piva on piva.product_item_id = pi.id
            join variant_attributes va on va.id = piva.variant_attribute_id
            join variants v on v.id = va.variant_id
            where pi.product_id = :productId
            """, nativeQuery = true)
    List<Object[]> findVariantAttributeByProductId(UUID productId);

    @Query(value = """
            SELECT
            p.name as productName,
            pi.id as productItemId,
            CAST(pi.base_price AS DOUBLE PRECISION) as basePrice,
            CAST(pi.discounted_price AS DOUBLE PRECISION)  as discountedPrice,
            CAST(pi.available_stock AS INTEGER) as availableStock,
            pii.img_url as imgUrl
            FROM product_items pi
            join products p on p.id = pi.product_id
            join product_item_images pii on pi.id = pii.product_item_id
            where pii.is_thumbnail = true
            and pi.id in :productItemIds
                                    """, nativeQuery = true)
    List<CartProductItemInfoResponse> getCarProductItemInfos(List<UUID> productItemIds);
}
