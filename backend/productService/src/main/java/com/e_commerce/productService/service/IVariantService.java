package com.e_commerce.productService.service;

import com.e_commerce.productService.model.dto.variant.VariantDTO;
import com.e_commerce.productService.model.dto.variant.VariantWithCategoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IVariantService {
    VariantDTO addVariant(UUID categoryId, VariantDTO variantDTO);

    VariantDTO editVariant(UUID categoryId, UUID variantId, VariantDTO variantDTO);

    Page<VariantWithCategoryDTO> getVariantsByCategoryId(UUID categoryId, String query, Pageable pageable);

    VariantDTO getVariantDetails(UUID variantId);
}
