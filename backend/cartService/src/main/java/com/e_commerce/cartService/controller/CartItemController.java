package com.e_commerce.cartService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.cartService.model.dto.CartItemRequestDTO;
import com.e_commerce.cartService.service.ICartItemService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(path = "/cart-items")
@AllArgsConstructor
public class CartItemController {

    private final ICartItemService cartItemService;

    @GetMapping("/check/{productItemId}")
    public ResponseEntity<Map<String, Integer>> getNoOfItemIsInCartByProductItemId(@PathVariable UUID productItemId,
            Authentication authentication) {
        Integer noOfItemsInCart = cartItemService.getNoOfItemIsInCartByProductItemId(productItemId,
                authentication.getName());
        return ResponseEntity.ok(Map.of("noOfItemsInCart", noOfItemsInCart));
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addItemInCart(@Valid @RequestBody CartItemRequestDTO cartItemRequestDTO,
            Authentication authentication) {
        cartItemService.addItemInCart(cartItemRequestDTO, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateItemInCart(
            @Valid @RequestBody CartItemRequestDTO cartItemRequestDTO,
            Authentication authentication) {
        cartItemService.updateItemInCart(cartItemRequestDTO, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/{productItemId}")
    public ResponseEntity<Void> deleteItemInCart(
            @PathVariable UUID productItemId,
            Authentication authentication) {
        cartItemService.deleteItemInCart(productItemId, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Integer>> getCartItemCount(Authentication authentication) {
        Integer itemCountInCart = cartItemService.getCartItemCount(authentication.getName());
        return ResponseEntity.ok(Map.of("itemCountInCart", itemCountInCart));
    }

    @GetMapping
    public ResponseEntity<List<CartItemRequestDTO>> getCartItems(Authentication authentication) {
        return ResponseEntity.ok(cartItemService.getCartItems(authentication.getName()));
    }

}
