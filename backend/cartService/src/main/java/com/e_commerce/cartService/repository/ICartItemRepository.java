package com.e_commerce.cartService.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e_commerce.cartService.model.CartItem;
import com.e_commerce.cartService.model.dto.CartItemRequestDTO;
import com.e_commerce.common.model.dto.CartItemDTO;

public interface ICartItemRepository extends JpaRepository<CartItem, UUID> {
    @Query(value = """
            SELECT CI.PRODUCT_ITEM_ID AS productItemId,
                CI.QUANTITY AS quantity,
                CI.price_snapshot AS priceSnapshot,
                        CI.is_selected AS isSelected
                         FROM CART_ITEMS CI
                                 WHERE CI.CART_ID = :cartId
                         order by ci.is_selected desc, ci.updated_at desc
                        """, nativeQuery = true)
    List<CartItemRequestDTO> getAllByCartId(UUID cartId);

    Optional<CartItem> findByCartIdAndProductItemId(UUID cartId, UUID productItemId);

    @Query(value = """
            SELECT CI.QUANTITY AS noOfItemsInCart FROM CARTS C
            JOIN CART_ITEMS CI ON C.id = CI.cart_id
            WHERE CI.product_item_id = :productItemId AND C.user_id = :userId AND C.status = 'ACTIVE'
                        """, nativeQuery = true)
    Optional<Integer> getNoOfItemIsInCartByProductItemId(UUID productItemId, String userId);

    @Query(value = """
            select count(product_item_id) FROM cart_items
            where cart_id = :cartId
                                    """, nativeQuery = true)
    Integer getCartItemCount(UUID cartId);
    @Query(value = """
            SELECT CI.product_item_id AS productItemId, CI.QUANTITY AS quantity FROM CARTS C
            JOIN CART_ITEMS CI ON C.id = CI.cart_id
            WHERE C.id = :cartId and ci.is_selected = true
                                    """, nativeQuery = true)
    List<CartItemDTO> getAllByCartIdForOrder(UUID cartId);
}
