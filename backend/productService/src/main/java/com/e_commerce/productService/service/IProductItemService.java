package com.e_commerce.productService.service;

import com.e_commerce.productService.model.dto.variant.ProductVariantAttributesDTO;

import java.util.List;
import java.util.UUID;

public interface IProductItemService {

    List<ProductVariantAttributesDTO> getVariantAttributesByCategoryId(UUID productId);
}
