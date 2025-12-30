package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.Product;
import com.e_commerce.productService.model.dto.variant.ProductVariantAttributesDTO;
import com.e_commerce.productService.service.IProductItemService;
import com.e_commerce.productService.service.IProductService;
import com.e_commerce.productService.service.IVariantService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
@AllArgsConstructor
public class ProductItemService implements IProductItemService {

    private IProductService productService;
    private IVariantService variantService;

    @Override
    public List<ProductVariantAttributesDTO> getVariantAttributesByCategoryId(UUID productId) {
        Product existingProduct = productService.getProduct(productId);
        Category category = existingProduct.getCategory();
        return variantService.getVariantsByCategoryId(category.getId());
    }
}
