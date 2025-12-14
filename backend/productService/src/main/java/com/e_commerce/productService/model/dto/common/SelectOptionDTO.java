package com.e_commerce.productService.model.dto.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelectOptionDTO<T> {
    private String label;
    private T value;

    public SelectOptionDTO(String label, T value) {
        this.label = label;
        this.value = value;
    }
}
