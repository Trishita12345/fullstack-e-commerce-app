package com.e_commerce.productService.service;

import com.e_commerce.productService.model.dto.common.PageRequestDTO;
import com.e_commerce.productService.model.dto.product.ProductDTO;
import com.e_commerce.productService.model.dto.product.ProductFilterDTO;
import com.e_commerce.productService.model.dto.product.ProductListingResponseDTO;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface IProductService {
    Page<ProductListingResponseDTO> getAllProducts(String query, PageRequestDTO<ProductFilterDTO> pageRequestDTO);

    ProductDTO addProduct(ProductDTO productDTO);

    ProductDTO getProductById(UUID productId);

    ProductDTO editProductById(UUID productId, ProductDTO productDTO);
}

