package com.e_commerce.productService.model.dto.category;

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
    private String description;
    private String imgUrl;
    private UUID parentCategoryId;
}
