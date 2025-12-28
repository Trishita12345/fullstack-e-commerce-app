package com.e_commerce.productService.model.dto.product;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Getter
@Setter
@Builder
@AllArgsConstructor
public class ProductDTO {

    @Nullable
    private UUID productId;
    @NotBlank
    @Size(max = 100, message = "Please enter a product name within 100 characters")
    private String productName;

    @NotBlank
    private String description;

    @NotBlank
    private String feature;
    @NotNull
    private UUID categoryId;
}