package com.e_commerce.cartService.service;

import java.util.List;
import java.util.UUID;

import com.e_commerce.cartService.model.dto.CartItemRequestDTO;

public interface ICartItemService {

    Integer getNoOfItemIsInCartByProductItemId(UUID productItemId, String userId);

    void deleteItemInCart(UUID productItemId, String userId);

    void updateItemInCart(CartItemRequestDTO cartItemRequestDTO, String userId);

    void addItemInCart(CartItemRequestDTO cartItemRequestDTO, String userId);

    Integer getCartItemCount(String userId);

    List<CartItemRequestDTO> getCartItems(String userId);

}
