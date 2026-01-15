package com.e_commerce.cartService.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e_commerce.cartService.model.Cart;
import com.e_commerce.cartService.model.CartItem;
import com.e_commerce.cartService.model.dto.CartItemRequestDTO;
import com.e_commerce.cartService.model.enums.CartStatus;
import com.e_commerce.cartService.repository.ICartItemRepository;
import com.e_commerce.cartService.repository.ICartRepository;
import com.e_commerce.cartService.service.ICartItemService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartItemServiceImpl implements ICartItemService {

        private final ICartItemRepository cartItemRepository;
        private final ICartRepository cartRepository;

        @Override
        public Integer getNoOfItemIsInCartByProductItemId(UUID productItemId, String userId) {
                Optional<Integer> value = cartItemRepository.getNoOfItemIsInCartByProductItemId(productItemId, userId);
                return value.isPresent() ? value.get() : 0;
        }

        @Override
        @Transactional
        public void addItemInCart(CartItemRequestDTO cartItemRequestDTO, String userId) {
                CartItem cartItem = CartItem.builder()
                                .productItemId(cartItemRequestDTO.getProductItemId())
                                .priceSnapshot(cartItemRequestDTO.getPriceSnapshot())
                                .quantity(cartItemRequestDTO.getQuantity()).build();

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

                cartItem.setCart(cart);
                cart.getItems().add(cartItem);
                cartRepository.save(cart);
        }

        @Override
        @Transactional
        public void updateItemInCart(CartItemRequestDTO dto, String userId) {
                Cart cart = cartRepository
                                .findByUserIdAndStatus(userId, CartStatus.ACTIVE)
                                .orElseThrow(() -> new IllegalStateException("Active cart not found"));

                CartItem cartItem = cartItemRepository
                                .findByCartIdAndProductItemId(cart.getId(), dto.getProductItemId())
                                .orElseThrow(() -> new IllegalStateException("Item not found in cart"));

                cartItem.setQuantity(dto.getQuantity());
                cartItemRepository.save(cartItem);
        }

        @Override
        @Transactional
        public void deleteItemInCart(UUID productItemId, String userId) {
                Cart cart = cartRepository
                                .findByUserIdAndStatus(userId, CartStatus.ACTIVE)
                                .orElseThrow(() -> new IllegalStateException("Active cart not found"));

                CartItem cartItem = cartItemRepository
                                .findByCartIdAndProductItemId(cart.getId(), productItemId)
                                .orElseThrow(() -> new IllegalStateException("Item not found in cart"));

                cartItemRepository.delete(cartItem);
        }

        @Override
        public Integer getCartItemCount(String userId) {
                Optional<Cart> optinalCart = cartRepository.findByUserIdAndStatus(userId, CartStatus.ACTIVE);

                return optinalCart.isPresent() ? cartItemRepository.getCartItemCount(optinalCart.get().getId()) : 0;

        }

        @Override
        public List<CartItemRequestDTO> getCartItems(String userId) {
                Optional<Cart> optinalCart = cartRepository.findByUserIdAndStatus(userId, CartStatus.ACTIVE);
                return optinalCart.isPresent()
                                ? cartItemRepository.getAllByCartId(optinalCart.get().getId())
                                : new ArrayList<>();
        }

}
