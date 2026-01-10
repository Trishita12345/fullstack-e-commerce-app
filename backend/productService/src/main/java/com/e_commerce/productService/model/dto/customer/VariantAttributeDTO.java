package com.e_commerce.productService.model.dto.customer;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantAttributeDTO {

    private String name;
    private UUID productItemId;
}
