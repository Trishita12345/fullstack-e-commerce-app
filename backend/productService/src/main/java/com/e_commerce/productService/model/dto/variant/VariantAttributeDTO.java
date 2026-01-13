package com.e_commerce.productService.model.dto.variant;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
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
public class VariantAttributeDTO {

    @NotBlank
    @Size(max = 100, message = "Please enter a variant attribute within 100 characters")
    private String name;

    @Nullable
    private UUID id;
}
