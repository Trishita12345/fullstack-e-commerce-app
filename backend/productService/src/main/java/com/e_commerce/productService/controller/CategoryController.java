package com.e_commerce.productService.controller;

import com.e_commerce.productService.model.dto.category.CategoryListingResponseDTO;
import com.e_commerce.productService.model.dto.category.CategoryRequestDTO;
import com.e_commerce.productService.model.dto.category.CategoryResponseDTO;
import com.e_commerce.productService.model.dto.common.SelectOptionDTO;
import com.e_commerce.productService.service.ICategoryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/category")
@AllArgsConstructor
public class CategoryController {
    private final ICategoryService categoryService;

    //@AuthenticationPrincipal Jwt jwt,
    @PostMapping("/add")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<CategoryResponseDTO> addCategory(@Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {
        return ResponseEntity.ok(categoryService.addCategory(categoryRequestDTO));
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<CategoryResponseDTO> editCategory(@PathVariable UUID id, @Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {
        return ResponseEntity.ok(categoryService.editCategory(id, categoryRequestDTO));
    }

    @GetMapping("/get-parent-categories")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<SelectOptionDTO<UUID>>> getParentCategories() {
        return ResponseEntity.ok(categoryService.getParentCategories());
    }

    @GetMapping("")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<CategoryListingResponseDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable UUID id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }
}