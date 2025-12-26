package com.e_commerce.productService.service;

import com.e_commerce.productService.model.dto.product.ProductFilterDTO;
import com.e_commerce.productService.model.dto.product.ProductListingResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {
    Page<ProductListingResponseDTO> getAllProducts(String query, ProductFilterDTO filters, Pageable pageable);
}

