package com.e_commerce.cartService.service;

import java.util.List;
import java.util.UUID;

import com.e_commerce.cartService.model.dto.CartItemRequestDTO;
import com.e_commerce.cartService.model.dto.CartItemRequestDTOWithUpdatedQty;
import com.e_commerce.common.model.dto.CartDTO;

public interface ICartItemService {

    Integer getNoOfItemIsInCartByProductItemId(UUID productItemId, String userId);

    void deleteItemInCart(UUID productItemId, String userId);

    void updateItemInCart(CartItemRequestDTO cartItemRequestDTO, String userId);

    void addItemInCart(CartItemRequestDTO cartItemRequestDTO, String userId);

    Integer getCartItemCount(String userId);

    List<CartItemRequestDTOWithUpdatedQty> getCartItems(String userId);

    CartDTO getSelectedItemsInCart(String userId);

    void updateAllItemInCart(List<CartItemRequestDTOWithUpdatedQty> cartItemRequestDTOWithUpdatedQty, String userId);

}
