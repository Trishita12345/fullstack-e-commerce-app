package com.e_commerce.cartService.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.cartService.service.ICartItemService;
import com.e_commerce.common.model.dto.CartDTO;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/internal")
@AllArgsConstructor
public class InternalController {

    private final ICartItemService cartItemService;

    @GetMapping("/demo")
    public String demo(Authentication authentication) {
        return "cart service called";
    }

    @GetMapping("/cart/selected-items")
    public CartDTO getSelectedItemsInCart(Authentication authentication) {
        return cartItemService.getSelectedItemsInCart(authentication.getName());
    }
}
