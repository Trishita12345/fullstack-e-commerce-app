package com.e_commerce.productService.controller;

import com.e_commerce.productService.model.dto.variant.ProductVariantAttributesDTO;
import com.e_commerce.productService.service.IProductItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/productItem")
@AllArgsConstructor
public class ProductItemController {

    private IProductItemService productItemService;

    @GetMapping("/{productId}/variant-attributes")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<ProductVariantAttributesDTO>> getVariantAttributesByCategoryId(@PathVariable UUID productId) {
        return ResponseEntity.ok(productItemService.getVariantAttributesByCategoryId(productId));
    }
}
