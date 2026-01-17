package com.e_commerce.cartService.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.cartService.service.IWishlistedService;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/wishlisted")
@AllArgsConstructor
public class WishlistedController {

    private final IWishlistedService wishlistedService;

    @GetMapping
    public ResponseEntity<List<UUID>> getWishlistedItems(Authentication authentication) {
        return ResponseEntity.ok(wishlistedService.getWishlistedItems(authentication.getName()));
    }

    @PostMapping("/add/{productItemId}")
    public ResponseEntity<Void> addWishlistedItem(Authentication authentication,
            @PathVariable UUID productItemId) {
        wishlistedService.addtoWishlist(authentication.getName(), productItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/{productItemId}")
    public ResponseEntity<Void> removeWishlistedItem(Authentication authentication,
            @PathVariable UUID productItemId) {
        wishlistedService.removeFromWishlist(authentication.getName(), productItemId);
        return ResponseEntity.noContent().build();
    }

}
