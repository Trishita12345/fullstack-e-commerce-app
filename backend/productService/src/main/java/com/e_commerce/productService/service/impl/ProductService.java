package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.dto.common.PageRequestDTO;
import com.e_commerce.productService.model.dto.product.ProductFilterDTO;
import com.e_commerce.productService.model.dto.product.ProductListingResponseDTO;
import com.e_commerce.productService.repository.IProductRepository;
import com.e_commerce.productService.service.IProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService implements IProductService {
    private IProductRepository productRepository;


    @Override
    public Page<ProductListingResponseDTO> getAllProducts(String query, PageRequestDTO<ProductFilterDTO> pageRequestDTO) {
        ProductFilterDTO filters = pageRequestDTO.getFilters();
        List<String> categories = filters != null ? filters.getCategories() : new ArrayList<>();
        Sort sort = pageRequestDTO.getDirection().equalsIgnoreCase("desc") ?
                Sort.by(pageRequestDTO.getSortBy()).descending() :
                Sort.by(pageRequestDTO.getSortBy()).ascending();
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize(), sort);
        return productRepository.findAllProducts(query, categories, pageable);
    }
}
