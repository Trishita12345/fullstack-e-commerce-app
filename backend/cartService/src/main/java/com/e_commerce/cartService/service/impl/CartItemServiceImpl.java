package com.e_commerce.cartService.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.e_commerce.cartService.model.Cart;
import com.e_commerce.cartService.model.CartItem;
import com.e_commerce.cartService.model.dto.CartItemRequestDTO;
import com.e_commerce.cartService.model.dto.CartItemRequestDTOWithUpdatedQty;
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
                                .updatedQuantity(cartItemRequestDTO.getQuantity())
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
                cartItem.setUpdatedQuantity(dto.getQuantity());
                if (dto.getIsSelected() != null)
                        cartItem.setIsSelected(dto.getIsSelected());
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
        public List<CartItemRequestDTOWithUpdatedQty> getCartItems(String userId) {
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

        @Transactional
        @Override
        public void updateAllItemInCart(List<CartItemRequestDTOWithUpdatedQty> items,
                        String userId) {

                Cart cart = cartRepository
                                .findByUserId(userId)
                                .orElseThrow(() -> new IllegalStateException("Active cart not found"));

                List<CartItem> cartItems = cartItemRepository.getAllCartItemsByCartId(cart.getId());

                Map<UUID, CartItem> cartItemMap = cartItems.stream()
                                .collect(Collectors.toMap(
                                                CartItem::getProductItemId,
                                                ci -> ci));

                for (CartItemRequestDTOWithUpdatedQty dto : items) {
                        CartItem cartItem = cartItemMap.get(dto.getProductItemId());

                        if (cartItem == null) {
                                throw new IllegalStateException(
                                                "Item not found in cart: " + dto.getProductItemId());
                        }

                        cartItem.setUpdatedQuantity(dto.getUpdatedQuantity());

                        if (dto.getUpdatedQuantity() == 0) {
                                cartItem.setIsSelected(false);
                        }
                }

                cartItemRepository.saveAll(cartItems);

        }

        @Override
        @Transactional
        public void removeCartItems(List<CartItemDTO> items, String userId) {
                List<UUID> productItemIds = items.stream()
                                .map(CartItemDTO::getProductItemId)
                                .collect(Collectors.toList());
                cartItemRepository.deleteItems(productItemIds, userId);
        }

        @Override
        @Transactional
        public void mergeGuestCart(List<CartItemRequestDTO> guestItems, String userId) {
                // AC6: empty/null guest cart -> no-op.
                if (guestItems == null || guestItems.isEmpty()) {
                        return;
                }

                // AC2: load the user's cart; create an ACTIVE cart on demand (mirror addItemInCart).
                Cart cart = cartRepository
                                .findByUserId(userId)
                                .orElseGet(() -> Cart.builder()
                                                .userId(userId)
                                                .status(CartStatus.ACTIVE)
                                                .items(new ArrayList<>())
                                                .build());

                if (cart.getItems() == null) {
                        cart.setItems(new ArrayList<>());
                }

                // AC1 + R2: index existing items by productItemId. Use a merge function that
                // keeps the first occurrence so pre-existing duplicate rows do not throw.
                Map<UUID, CartItem> byProductItem = cartItemRepository
                                .getAllCartItemsByCartId(cart.getId())
                                .stream()
                                .collect(Collectors.toMap(
                                                CartItem::getProductItemId,
                                                ci -> ci,
                                                (existing, duplicate) -> existing));

                for (CartItemRequestDTO guestItem : guestItems) {
                        CartItem match = byProductItem.get(guestItem.getProductItemId());
                        if (match != null) {
                                // AC3 / D1: overwrite quantity with guest quantity.
                                match.setQuantity(guestItem.getQuantity());
                                match.setUpdatedQuantity(guestItem.getQuantity());
                                // D2: retain existing isSelected and priceSnapshot (do not touch).
                        } else {
                                // AC2 / D2: new guest line -> isSelected=true, guest priceSnapshot.
                                CartItem newItem = CartItem.builder()
                                                .productItemId(guestItem.getProductItemId())
                                                .quantity(guestItem.getQuantity())
                                                .updatedQuantity(guestItem.getQuantity())
                                                .priceSnapshot(guestItem.getPriceSnapshot())
                                                .isSelected(true)
                                                .cart(cart)
                                                .build();
                                cart.getItems().add(newItem);
                                // AC5: dedupe within the guest payload itself so repeated
                                // productItemIds update the just-created line instead of inserting twice.
                                byProductItem.put(guestItem.getProductItemId(), newItem);
                        }
                }

                // AC8: single transaction; cascade persists new items and flushes updated ones.
                cartRepository.save(cart);
        }

}

