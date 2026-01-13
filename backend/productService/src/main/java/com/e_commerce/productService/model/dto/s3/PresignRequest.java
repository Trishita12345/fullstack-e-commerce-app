package com.e_commerce.productService.model.dto.s3;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PresignRequest {
    private String key;
    private String contentType;
}
