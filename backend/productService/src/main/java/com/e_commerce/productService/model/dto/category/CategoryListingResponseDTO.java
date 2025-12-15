package com.e_commerce.productService.model.dto.category;

import com.e_commerce.productService.model.dto.common.SelectOptionDTO;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CategoryListingResponseDTO {
    private UUID id;
    private String name;
    private SelectOptionDTO<UUID> parentCategory;
    private Boolean isParentCategory;
}
