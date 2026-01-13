package com.e_commerce.productService.model.dto.variant;

import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class VariantDTO {

    @Nullable
    private UUID id;

    @NotBlank
    @Size(max = 100, message = "Please enter a variant name within 100 characters")
    private String name;

    @NotEmpty
    @Valid
    private List<VariantAttributeDTO> attributes;
}


