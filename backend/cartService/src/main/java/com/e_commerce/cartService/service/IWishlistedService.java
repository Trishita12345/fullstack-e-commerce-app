package com.e_commerce.cartService.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.e_commerce.cartService.model.dto.CartItemRequestDTO;

public interface IWishlistedService {

    List<UUID> getWishlistedItems(String userId);

    void addtoWishlist(String name, UUID productItemId);

    void removeFromWishlist(String name, UUID productItemId);

    Map<String, Boolean> isItemWishlisted(String userId, UUID productItemId);

    void moveToCartFromWishlisted(String userId, CartItemRequestDTO cartItemRequestDTO);

}
