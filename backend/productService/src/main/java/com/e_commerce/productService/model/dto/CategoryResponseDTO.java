package com.e_commerce.productService.model.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CategoryResponseDTO {
    private UUID id;
    private String name;
}
