package com.e_commerce.productService.repository;
import com.e_commerce.productService.model.ProductItem;
import com.e_commerce.productService.model.VariantAttribute;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface IVariantAttributeRepository extends JpaRepository<VariantAttribute, UUID> {

    List<VariantAttribute> findByVariant_Id(UUID variantId);

    Optional<VariantAttribute> findByVariant_IdAndName(UUID variantId, String name);

    // Used for filter-based product search
    @Query("""
        select distinct pi
        from ProductItem pi
        join fetch pi.images
        join pi.variantAttributes va
        where va.id in :attributeIds
    """)
    Page<ProductItem> findProductItemsByVariantAttributes(
            @Param("attributeIds") Set<UUID> attributeIds,
            Pageable pageable
    );
}

