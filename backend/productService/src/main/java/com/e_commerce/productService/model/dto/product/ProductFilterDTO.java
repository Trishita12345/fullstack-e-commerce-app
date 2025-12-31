package com.e_commerce.productService.model.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProductFilterDTO {
    private List<String> categories;
}
