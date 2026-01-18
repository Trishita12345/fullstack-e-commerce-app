package com.e_commerce.cartService.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e_commerce.cartService.model.Cart;
import com.e_commerce.cartService.model.CartItem;
import com.e_commerce.cartService.model.Wishlisted;
import com.e_commerce.cartService.model.dto.CartItemRequestDTO;
import com.e_commerce.cartService.model.enums.CartStatus;
import com.e_commerce.cartService.repository.ICartItemRepository;
import com.e_commerce.cartService.repository.ICartRepository;
import com.e_commerce.cartService.repository.IWishlistedRepository;
import com.e_commerce.cartService.service.IWishlistedService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class WishlistedServiceImpl implements IWishlistedService {

    private final IWishlistedRepository wishlistedRepository;
    private final ICartRepository cartRepository;
    private final ICartItemRepository cartItemRepository;

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
            res.put("isWishlisted", true);
        } else {
            res.put("isWishlisted", false);
        }
        return res;
    }

    @Override
    @Transactional
    public void moveToCartFromWishlisted(String userId, CartItemRequestDTO cartItemRequestDTO) {
        System.out.println("wishlisted log: " + cartItemRequestDTO.getProductItemId() + " " + userId);
        Wishlisted wishlisted = wishlistedRepository
                .findByUserIdAndProductItemId(userId, cartItemRequestDTO.getProductItemId())
                .orElseThrow(() -> new IllegalStateException("Wishlisted Item not found"));
        wishlistedRepository.delete(wishlisted);
        Cart cart = cartRepository
                .findByUserIdAndStatus(userId, CartStatus.ACTIVE)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .userId(userId)
                            .status(CartStatus.ACTIVE)
                            .items(new ArrayList<>())
                            .build();
                    return newCart;
                });
        CartItem cartItem = cartItemRepository
                .findByCartIdAndProductItemId(cart.getId(), cartItemRequestDTO.getProductItemId())
                .orElseGet(
                        () -> CartItem.builder()
                                .productItemId(cartItemRequestDTO.getProductItemId())
                                .priceSnapshot(cartItemRequestDTO.getPriceSnapshot())
                                .quantity(1).build());

        cartItem.setCart(cart);
        cart.getItems().add(cartItem);
        cartRepository.save(cart);
    }

}
