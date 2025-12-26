package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.dto.product.ProductFilterDTO;
import com.e_commerce.productService.model.dto.product.ProductListingResponseDTO;
import com.e_commerce.productService.repository.IProductRepository;
import com.e_commerce.productService.service.IProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProductService implements IProductService {
    private IProductRepository productRepository;

    @Override
    public Page<ProductListingResponseDTO> getAllProducts(String query, ProductFilterDTO filters, Pageable pageable) {
        return productRepository.findAllProducts(query, filters.getCategories(), pageable);
    }
}
