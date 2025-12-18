package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.dto.category.CategoryListingResponseDTO;
import com.e_commerce.productService.model.dto.category.CategoryRequestDTO;
import com.e_commerce.productService.model.dto.category.CategoryResponseDTO;
import com.e_commerce.productService.model.dto.common.SelectOptionDTO;
import com.e_commerce.productService.repository.ICategoryRepository;
import com.e_commerce.productService.service.ICategoryService;
import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CategoryService implements ICategoryService {
    private final ICategoryRepository categoryRepository;

    @Override
    @Transactional
    public CategoryResponseDTO addCategory(CategoryRequestDTO categoryRequestDTO) {
        Category category = new Category();
        category.setName(categoryRequestDTO.getName());
        if (categoryRequestDTO.getParentCategoryId() != null) {
            Optional<Category> parentCategory = categoryRepository.findById(categoryRequestDTO.getParentCategoryId());
            parentCategory.ifPresent(category::setParentCategory);
        }
        Category savedCategory = categoryRepository.save(category);
        return categoryEntityToResponseDTOMapper(savedCategory);
    }

    @Override
    @Transactional
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
        return categoryEntityToResponseDTOMapper(savedCategory);
    }

    private static CategoryResponseDTO categoryEntityToResponseDTOMapper(Category savedCategory) {
        return CategoryResponseDTO.builder()
                .id(savedCategory.getId())
                .name(savedCategory.getName())
                .parentCategory(getParentCategoryAsSelectOptionDTO(savedCategory.getParentCategory()))
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

    @Override
    public List<CategoryListingResponseDTO> getAllCategories() {
        List<Category> allCategories = categoryRepository.findAll();
        return allCategories.stream()
                .map(category -> CategoryListingResponseDTO.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .parentCategory(getParentCategoryAsSelectOptionDTO(category.getParentCategory()))
                        .isParentCategory(!category.getSubCategories().isEmpty())
                        .build())
                .toList();
    }


    @Nullable
    private static SelectOptionDTO<UUID> getParentCategoryAsSelectOptionDTO(Category parent) {
        if (parent == null)
            return null;
        return new SelectOptionDTO<UUID>(parent.getName(), parent.getId());
    }

    public List<Category> getCategoryHierarchy(Category leaf) {
        List<Category> hierarchy = new ArrayList<>();
        Category current = leaf;

        while (current != null) {
            hierarchy.add(current);
            current = current.getParentCategory();
        }

        return hierarchy;
    }

    public Category getCategory(UUID categoryId) {
        Optional<Category> existingCategory = categoryRepository.findById(categoryId);
        return existingCategory
                .orElseThrow(() ->
                        new RuntimeException("Category with ID: " + categoryId + " not exist"));
    }

    @Override
    public CategoryResponseDTO getCategoryById(UUID id) {
        return categoryEntityToResponseDTOMapper(getCategory(id));
    }
}
