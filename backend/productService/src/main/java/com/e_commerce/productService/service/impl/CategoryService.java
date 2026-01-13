package com.e_commerce.productService.service.impl;

import com.e_commerce.productService.model.Category;
import com.e_commerce.productService.model.dto.category.CategoryListingResponseDTO;
import com.e_commerce.productService.model.dto.category.CategoryRequestDTO;
import com.e_commerce.productService.model.dto.category.CategoryResponseDTO;
import com.e_commerce.productService.model.dto.customer.CategoryResponseDTOLanding;
import com.e_commerce.productService.model.dto.common.SelectOptionDTO;
import com.e_commerce.productService.repository.ICategoryRepository;
import com.e_commerce.productService.service.ICategoryService;
import com.e_commerce.productService.service.IS3Service;

import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CategoryService implements ICategoryService {
    private final ICategoryRepository categoryRepository;
    private final IS3Service s3Service;

    @Override
    @Transactional
    public CategoryResponseDTO addCategory(CategoryRequestDTO categoryRequestDTO) {
        Category category = new Category();
        category.setName(categoryRequestDTO.getName());
        category.setDescription(categoryRequestDTO.getDescription());
        category.setImgUrl(s3Service.moveFromTempToProducts(categoryRequestDTO.getImgUrl()));
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
        category.setDescription(category.getDescription());
        if (categoryRequestDTO.getImgUrl().contains("temp/")) {
            if (!category.getImgUrl().isEmpty())
                s3Service.deleteFromS3(category.getImgUrl());
            category.setImgUrl(s3Service.moveFromTempToProducts(categoryRequestDTO.getImgUrl()));
        }
        if (categoryRequestDTO.getParentCategoryId() != null) {
            Optional<Category> parentCategory = categoryRepository.findById(categoryRequestDTO.getParentCategoryId());
            parentCategory.ifPresent(category::setParentCategory);
        }
        Category savedCategory = categoryRepository.save(category);
        return categoryEntityToResponseDTOMapper(savedCategory);
    }

    private CategoryResponseDTO categoryEntityToResponseDTOMapper(Category savedCategory) {
        return CategoryResponseDTO.builder()
                .id(savedCategory.getId())
                .name(savedCategory.getName())
                .description(savedCategory.getDescription())
                .imgUrl(s3Service.buildFullUrl(savedCategory.getImgUrl()))
                .parentCategoryId(
                        savedCategory.getParentCategory() != null ? savedCategory.getParentCategory().getId() : null)
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
    public List<SelectOptionDTO<UUID>> getLeafCategories() {
        List<Category> leafCategories = categoryRepository.findCategoriesWithNoChildCategories();
        return leafCategories
                .stream()
                .map(category -> new SelectOptionDTO<UUID>(category.getName(), category.getId()))
                .toList();
    }

    @Override
    public List<CategoryResponseDTOLanding> getLeafCategoriesCustomer() {
        List<CategoryResponseDTOLanding> leafCategories = categoryRepository
                .findCategoriesWithNoChildCategoriesForCustomer();
        return leafCategories
                .stream()
                .map(category -> {
                    category.setImgUrl(s3Service.buildFullUrl(category.getImgUrl()));
                    return category;
                })
                .toList();
    }

    @Override
    public List<SelectOptionDTO<UUID>> getAllCategoriesSelectOption() {
        List<Category> allCategories = categoryRepository.findAll();
        return allCategories
                .stream()
                .map(category -> new SelectOptionDTO<UUID>(category.getName(), category.getId()))
                .toList();
    }

    public List<SelectOptionDTO<UUID>> getAncestors(UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Category> ancestors = new ArrayList<>();
        ancestors.add(category);
        Category current = category.getParentCategory(); // start from parent
        while (current != null) {
            ancestors.add(current);
            current = current.getParentCategory();
        }

        return ancestors.stream()
                .map(c -> new SelectOptionDTO<UUID>(c.getName(), c.getId()))
                .toList();
    }

    @Override
    public Page<CategoryListingResponseDTO> getAllCategories(String query, Pageable pageable) {
        Page<Category> allCategories;
        if (query == null || query.trim().isEmpty()) {
            // No search query → return all
            allCategories = categoryRepository.findAll(pageable);
        } else {
            // Search by name or details
            allCategories = categoryRepository.findByNameContainingIgnoreCase(query, pageable);
        }
        return allCategories
                .map(category -> CategoryListingResponseDTO.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .description(category.getDescription())
                        .imgUrl(category.getImgUrl())
                        .parentCategory(getParentCategoryAsSelectOptionDTO(category.getParentCategory()))
                        .isParentCategory(!category.getSubCategories().isEmpty())
                        .build());
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
                .orElseThrow(() -> new RuntimeException("Category with ID: " + categoryId + " not exist"));
    }

    @Override
    public CategoryResponseDTO getCategoryById(UUID id) {
        return categoryEntityToResponseDTOMapper(getCategory(id));
    }
}
