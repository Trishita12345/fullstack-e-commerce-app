package com.e_commerce.productService.model.dto.variant;

import com.e_commerce.productService.model.dto.common.SelectOptionDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductVariantAttributesDTO {
    private UUID variantId;
    private String variantName;
    private List<SelectOptionDTO<UUID>> attributes;
}
