package com.e_commerce.productService.service;

import com.e_commerce.productService.model.Product;
import com.e_commerce.productService.model.dto.product.ProductDTO;
import com.e_commerce.productService.model.dto.product.ProductListingResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IProductService {
    ProductDTO addProduct(ProductDTO productDTO);

    ProductDTO getProductById(UUID productId);

    ProductDTO editProductById(UUID productId, ProductDTO productDTO);

    Product getProduct(UUID productId);

    Page<ProductListingResponseDTO> getAllProducts(String query, String filter, Pageable pageable);
}
