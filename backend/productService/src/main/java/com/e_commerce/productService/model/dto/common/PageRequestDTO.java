package com.e_commerce.productService.model.dto.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageRequestDTO {
    private int page = 0;
    private int size = 10;
    private String sortBy = "createdAt";
    private String direction = "desc";
}
