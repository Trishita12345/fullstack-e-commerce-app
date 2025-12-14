package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.dto.CategoryRequestDTO;
import com.e_commerce.productService.model.dto.CategoryResponseDTO;
import com.e_commerce.productService.model.dto.common.SelectOptionDTO;
import com.e_commerce.productService.repository.ICategoryRepository;
import com.e_commerce.productService.service.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CategoryService implements ICategoryService {
    private final ICategoryRepository categoryRepository;

    @Override
    public CategoryResponseDTO addCategory(CategoryRequestDTO categoryRequestDTO) {
        Category category = new Category();
        category.setName(categoryRequestDTO.getName());
        if (categoryRequestDTO.getParentCategoryId() != null) {
            Optional<Category> parentCategory = categoryRepository.findById(categoryRequestDTO.getParentCategoryId());
            parentCategory.ifPresent(category::setParentCategory);
        }
        Category savedCategory = categoryRepository.save(category);
        return CategoryResponseDTO.builder()
                .id(savedCategory.getId())
                .name(savedCategory.getName())
                .build();
    }

    @Override
    public CategoryResponseDTO editCategory(UUID id, CategoryRequestDTO categoryRequestDTO) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isEmpty()) {
            throw new RuntimeException("category of ID: " + id + " not found");
        }
        Category category = existingCategory.get();
        category.setName(categoryRequestDTO.getName());
        if (categoryRequestDTO.getParentCategoryId() != null) {
            Optional<Category> parentCategory = categoryRepository.findById(categoryRequestDTO.getParentCategoryId());
            parentCategory.ifPresent(category::setParentCategory);
        }
        Category savedCategory = categoryRepository.save(category);
        return CategoryResponseDTO.builder()
                .id(savedCategory.getId())
                .name(savedCategory.getName())
                .build();
    }

    @Override
    public List<SelectOptionDTO<UUID>> getParentCategories() {
        List<Category> parentCategories = categoryRepository.findCategoriesWithNoProducts();
        return parentCategories
                .stream()
                .map(category -> new SelectOptionDTO<UUID>(category.getName(), category.getId()))
                .toList();
    }
}
