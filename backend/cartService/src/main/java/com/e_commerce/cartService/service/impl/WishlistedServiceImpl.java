package com.e_commerce.cartService.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e_commerce.cartService.model.Wishlisted;
import com.e_commerce.cartService.repository.IWishlistedRepository;
import com.e_commerce.cartService.service.ICartItemService;
import com.e_commerce.cartService.service.IWishlistedService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class WishlistedServiceImpl implements IWishlistedService {

    private static final String IS_WISHLISTED = "isWishlisted";
    private final IWishlistedRepository wishlistedRepository;
    private final ICartItemService cartItemService;

    @Override
    public List<UUID> getWishlistedItems(String userId) {
        return wishlistedRepository.findByUserId(userId).stream().map(item -> item.getProductItemId()).toList();
    }

    @Override
    @Transactional
    public void addtoWishlist(String userId, UUID productItemId) {
        Wishlisted wishlisted = Wishlisted.builder()
                .userId(userId)
                .productItemId(productItemId)
                .build();
        wishlistedRepository.save(wishlisted);
    }

    @Override
    @Transactional
    public void removeFromWishlist(String userId, UUID productItemId) {
        Wishlisted wishlisted = wishlistedRepository.findByUserIdAndProductItemId(userId, productItemId)
                .orElseThrow(() -> new IllegalStateException("Wishlisted Item not found"));
        wishlistedRepository.delete(wishlisted);
    }

    @Override
    public Map<String, Boolean> isItemWishlisted(String userId, UUID productItemId) {
        Optional<Wishlisted> wishlisted = wishlistedRepository.findByUserIdAndProductItemId(userId, productItemId);
        Map<String, Boolean> res = new HashMap<>();
        if (wishlisted.isPresent()) {
            res.put(IS_WISHLISTED, true);
        } else {
            res.put(IS_WISHLISTED, false);
        }
        return res;
    }

    @Override
    @Transactional
    public void moveFromCartToWishlisted(String userId, UUID productItemId) {
        cartItemService.deleteItemInCart(productItemId, userId);
        if (isItemWishlisted(userId, productItemId).get(IS_WISHLISTED))
            return;
        addtoWishlist(userId, productItemId);
    }

}
