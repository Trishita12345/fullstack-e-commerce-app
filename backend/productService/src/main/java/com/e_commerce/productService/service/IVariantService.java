package com.e_commerce.productService.service;

import com.e_commerce.productService.model.dto.variant.VariantDTO;
import com.e_commerce.productService.model.dto.variant.VariantWithCategoryDTO;

import java.util.List;
import java.util.UUID;

public interface IVariantService {
    VariantDTO addVariant(UUID categoryId, VariantDTO variantDTO);

    List<VariantWithCategoryDTO> getVariantsByCategoryId(UUID categoryId);

    VariantDTO getVariantDetails(UUID variantsId);
}
