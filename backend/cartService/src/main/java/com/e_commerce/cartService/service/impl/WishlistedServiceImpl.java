package com.e_commerce.cartService.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e_commerce.cartService.model.Wishlisted;
import com.e_commerce.cartService.repository.IWishlistedRepository;
import com.e_commerce.cartService.service.IWishlistedService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class WishlistedServiceImpl implements IWishlistedService {

    private final IWishlistedRepository wishlistedRepository;

    @Override
    public List<UUID> getWishlistedItems(String userId) {
        return wishlistedRepository.findByUserId(userId).stream().map(item -> item.getProductItemId()).toList();
    }

    @Override
    public void addtoWishlist(String userId, UUID productItemId) {
        Wishlisted wishlisted = Wishlisted.builder()
                .userId(userId)
                .productItemId(productItemId)
                .build();
        wishlistedRepository.save(wishlisted);
    }

    @Override
    public void removeFromWishlist(String userId, UUID productItemId) {
        Wishlisted wishlisted = wishlistedRepository.findByUserIdAndProductItemId(userId, productItemId)
                .orElseThrow(() -> new IllegalStateException("Wishlisted Item not found"));
        wishlistedRepository.delete(wishlisted);
    }

}
