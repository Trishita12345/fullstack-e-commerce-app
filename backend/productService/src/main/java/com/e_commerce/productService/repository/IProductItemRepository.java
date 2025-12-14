package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.ProductItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface IProductItemRepository extends JpaRepository<ProductItem, UUID> {

    Optional<ProductItem> findBySku(String sku);

    // All SKUs for a product
    List<ProductItem> findByProduct_Id(UUID productId);

//    // PLP Page
//    @Query("""
//        select distinct pi
//        from ProductItem pi
//        left join fetch pi.images
//        left join fetch pi.variantAttributes
//    """)
//    Page<ProductItem> findAllItemsWithImagesWithVariantAttributes(Pageable pageable);


    // Fetch items with images and variants using query -- PDP page
    @Query("""
        select distinct pi
        from ProductItem pi
        left join fetch pi.images
        left join fetch pi.variantAttributes
        where pi.product.id = :productId
    """)
    Page<ProductItem> findItemsWithImagesWithVariantAttributesByProductId(@Param("productId") UUID productId, Pageable pageable);

}
