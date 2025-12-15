package com.e_commerce.productService.controller;

import com.e_commerce.productService.model.dto.variant.VariantDTO;
import com.e_commerce.productService.model.dto.variant.VariantWithCategoryDTO;
import com.e_commerce.productService.service.IVariantService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/variant")
@AllArgsConstructor
public class VariantController {

    private final IVariantService variantService;

    @PostMapping("/add/{categoryId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<VariantDTO> addVariant(@PathVariable UUID categoryId, @Valid @RequestBody VariantDTO variantDTO) {
        return ResponseEntity.ok(variantService.addVariant(categoryId, variantDTO));
    }

    @GetMapping("/{categoryId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<VariantWithCategoryDTO>> getVariantsByCategoryId(@PathVariable UUID categoryId) {
        return ResponseEntity.ok(variantService.getVariantsByCategoryId(categoryId));
    }

    @GetMapping("/{categoryId}/{variantsId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<VariantDTO> getVariantDetails(@PathVariable UUID variantsId) {
        return ResponseEntity.ok(variantService.getVariantDetails(variantsId));
    }
}