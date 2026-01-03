package com.e_commerce.productService.service;

import com.e_commerce.productService.model.dto.variant.ProductVariantAttributesDTO;
import com.e_commerce.productService.model.dto.variant.VariantDTO;
import com.e_commerce.productService.model.dto.variant.VariantWithCategoryDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface IVariantService {
    VariantDTO addVariant(UUID categoryId, VariantDTO variantDTO);

    VariantDTO editVariant(UUID categoryId, UUID variantId, VariantDTO variantDTO);

    List<ProductVariantAttributesDTO> getVariantsByCategoryId(UUID categoryId);

    Page<VariantWithCategoryDTO> getVariantsByCategoryId(UUID categoryId, String query, Pageable pageable);

    VariantDTO getVariantDetails(UUID variantId);

    Page<VariantWithCategoryDTO> getAllVariants(String query, String filter, Pageable pageable);
}
