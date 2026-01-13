package com.e_commerce.productService.repository;

import com.e_commerce.productService.model.ProductItemImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IProductItemImageRepository extends JpaRepository<ProductItemImage, UUID> {

    List<ProductItemImage> findByProductItem_Id(UUID productItemId);

    @Query(value = """
                        select
            pii.img_url
            from product_items pi
            join product_item_images pii ON pii.product_item_id = pi.id
            where pi.id = :productItemId
            order by pii.is_thumbnail desc
                        """, nativeQuery = true)
    List<String> findProductImagesByProductItemId(UUID productItemId);
}
