package com.e_commerce.productService.model.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantAttributeDTO {

    private String variantName;
    private List<VariantAttributeDTO> attributes;
}
