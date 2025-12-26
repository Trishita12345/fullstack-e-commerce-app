package com.e_commerce.productService.model.dto.product;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductFilterDTO {
    private List<String> categories;
}
