package com.e_commerce.productService.controller;

import com.e_commerce.productService.model.dto.common.PageRequestDTO;
import com.e_commerce.productService.model.dto.variant.VariantDTO;
import com.e_commerce.productService.model.dto.variant.VariantWithCategoryDTO;
import com.e_commerce.productService.service.IVariantService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/{categoryId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Page<VariantWithCategoryDTO>> getVariantsByCategoryId(@PathVariable UUID categoryId,
                                                                                @RequestParam(required = false, defaultValue = "") String query,
                                                                                @RequestBody PageRequestDTO pageRequestDTO
    ) {
        Sort sort = pageRequestDTO.getDirection().equalsIgnoreCase("desc") ?
                Sort.by(pageRequestDTO.getSortBy()).descending() :
                Sort.by(pageRequestDTO.getSortBy()).ascending();
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);
        return ResponseEntity.ok(variantService.getVariantsByCategoryId(categoryId, query, pageable));
    }

    @GetMapping("/{categoryId}/{variantId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<VariantDTO> getVariantDetails(@PathVariable UUID variantId) {
        return ResponseEntity.ok(variantService.getVariantDetails(variantId));
    }

    @PutMapping("/{categoryId}/{variantId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<VariantDTO> editVariant(@PathVariable UUID categoryId, @PathVariable UUID variantId, @Valid @RequestBody VariantDTO variantDTO) {
        return ResponseEntity.ok(variantService.editVariant(categoryId, variantId, variantDTO));
    }
}