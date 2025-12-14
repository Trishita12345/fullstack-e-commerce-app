package com.e_commerce.productService.model.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDTO {
    @NotBlank
    @Size(max = 100, message = "Category name must be at most 30 characters")
    private String name;

    @Nullable
    private UUID parentCategoryId;
}
