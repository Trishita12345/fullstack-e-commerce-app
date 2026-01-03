package com.e_commerce.productService.service;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.dto.category.CategoryListingResponseDTO;
import com.e_commerce.productService.model.dto.category.CategoryRequestDTO;
import com.e_commerce.productService.model.dto.category.CategoryResponseDTO;
import com.e_commerce.productService.model.dto.common.SelectOptionDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ICategoryService {
    CategoryResponseDTO addCategory(CategoryRequestDTO categoryRequestDTO);

    CategoryResponseDTO editCategory(UUID id, CategoryRequestDTO categoryRequestDTO);

    List<SelectOptionDTO<UUID>> getParentCategories();

    List<SelectOptionDTO<UUID>> getLeafCategories();

    Page<CategoryListingResponseDTO> getAllCategories(String query, Pageable pageable);

    List<Category> getCategoryHierarchy(Category leaf);

    Category getCategory(UUID categoryId);

    CategoryResponseDTO getCategoryById(UUID id);

    List<SelectOptionDTO<UUID>> getAllCategoriesSelectOption();
}
