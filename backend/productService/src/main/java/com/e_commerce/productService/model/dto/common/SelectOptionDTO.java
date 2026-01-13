package com.e_commerce.productService.model.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class SelectOptionDTO<T> {
    private String label;
    private T value;

//    public SelectOptionDTO(String label, T value) {
//        this.label = label;
//        this.value = value;
//    }
}
