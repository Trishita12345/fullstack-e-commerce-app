package com.e_commerce.productService.service;

import com.e_commerce.productService.model.dto.common.PageRequestDTO;
import com.e_commerce.productService.model.dto.product.ProductFilterDTO;
import com.e_commerce.productService.model.dto.product.ProductListingResponseDTO;
import org.springframework.data.domain.Page;

public interface IProductService {
    Page<ProductListingResponseDTO> getAllProducts(String query, PageRequestDTO<ProductFilterDTO> pageRequestDTO);
}

