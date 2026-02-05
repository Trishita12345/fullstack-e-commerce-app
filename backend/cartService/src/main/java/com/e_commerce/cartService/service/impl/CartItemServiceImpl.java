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
import com.e_commerce.common.model.dto.CartDTO;
import com.e_commerce.common.model.dto.CartItemDTO;

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
                                .quantity(cartItemRequestDTO.getQuantity())
                                .isSelected(true)
                                .build();
                Cart cart = cartRepository
                                .findByUserId(userId)
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
                                .findByUserId(userId)
                                .orElseThrow(() -> new IllegalStateException("Active cart not found"));

                CartItem cartItem = cartItemRepository
                                .findByCartIdAndProductItemId(cart.getId(), dto.getProductItemId())
                                .orElseThrow(() -> new IllegalStateException("Item not found in cart"));

                cartItem.setQuantity(dto.getQuantity());
                if(dto.getIsSelected() != null) cartItem.setIsSelected(dto.getIsSelected());
                cartItemRepository.save(cartItem);
        }

        @Override
        @Transactional
        public void deleteItemInCart(UUID productItemId, String userId) {
                Cart cart = cartRepository
                                .findByUserId(userId)
                                .orElseThrow(() -> new IllegalStateException("Active cart not found"));

                CartItem cartItem = cartItemRepository
                                .findByCartIdAndProductItemId(cart.getId(), productItemId)
                                .orElseThrow(() -> new IllegalStateException("Item not found in cart"));

                cartItemRepository.delete(cartItem);
        }

        @Override
        public Integer getCartItemCount(String userId) {
                Optional<Cart> optionalCart = cartRepository.findByUserId(userId);

                return optionalCart.isPresent() ? cartItemRepository.getCartItemCount(optionalCart.get().getId()) : 0;

        }

        @Override
        public List<CartItemRequestDTO> getCartItems(String userId) {
                Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
                return optionalCart.isPresent()
                                ? cartItemRepository.getAllByCartId(optionalCart.get().getId())
                                : new ArrayList<>();
        }

        @Override
        public CartDTO getSelectedItemsInCart(String userId) {
                Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
                List<CartItemDTO> itemDTOs = optionalCart.isPresent()
                        ? cartItemRepository.getAllByCartIdForOrder(optionalCart.get().getId())
                                : new ArrayList<>();
                return CartDTO.builder()
                                .cartId(optionalCart.get().getId())
                                .selectedCartItems(itemDTOs)
                                .build();
        }

}
