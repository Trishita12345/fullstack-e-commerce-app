package com.e_commerce.productService.model.dto.variant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class VariantWithCategoryDTO {

    private UUID variantId;
    private String variantName;
    private UUID CategoryId;
    private String CategoryName;


}



