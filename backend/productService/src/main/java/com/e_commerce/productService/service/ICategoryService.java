package com.e_commerce.productService.service;

import com.e_commerce.productService.model.dto.CategoryRequestDTO;
import com.e_commerce.productService.model.dto.CategoryResponseDTO;
import com.e_commerce.productService.model.dto.common.SelectOptionDTO;

import java.util.List;
import java.util.UUID;

public interface ICategoryService {
    CategoryResponseDTO addCategory(CategoryRequestDTO categoryRequestDTO);

    CategoryResponseDTO editCategory(UUID id, CategoryRequestDTO categoryRequestDTO);

    List<SelectOptionDTO<UUID>> getParentCategories();
}
