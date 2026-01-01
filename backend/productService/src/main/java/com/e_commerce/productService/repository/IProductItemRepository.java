package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.ProductItem;
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

        // @Query("""
        // SELECT pi FROM ProductItem pi
        // LEFT JOIN FETCH pi.variantAttributes va
        // LEFT JOIN FETCH va.variant v
        // LEFT JOIN FETCH pi.images pii
        // WHERE p.id = :productId
        // AND ((v.NAME = 'Fragrances' AND va.name in :fragranceList)
        // OR (v.NAME = 'Size' AND va.name in :sizeList)
        // OR (pi.discountedPrice in between :maxPrice and :minPrice))
        // """)
        // Page<ProductItem> findWithDetailsPaginated(UUID productId, Pageable pageable,
        // List<String>fragranceList, List<String>sizeList, BigDecimal minPrice,
        // BigDecimal maxPrice);

        @Query("""
                                SELECT DISTINCT pi
                                FROM ProductItem pi
                                JOIN pi.product p
                                LEFT JOIN pi.variantAttributes va
                                WHERE p.id = :productId
                                AND (:applyFilters = false OR va.name IN :filtersList)
                                AND (pi.discountedPrice BETWEEN :minPrice AND :maxPrice)

                        """)
        Page<ProductItem> findProductItemsPage(
                        UUID productId,
                        List<String> filtersList,
                        boolean applyFilters,
                        BigDecimal minPrice,
                        BigDecimal maxPrice,
                        Pageable pageable);

        @Query("""
                                SELECT DISTINCT pi
                                FROM ProductItem pi
                                LEFT JOIN FETCH pi.variantAttributes va
                                LEFT JOIN FETCH va.variant
                                LEFT JOIN FETCH pi.images
                                WHERE pi.id IN :ids
                        """)
        List<ProductItem> fetchDetails(List<UUID> ids);

}
