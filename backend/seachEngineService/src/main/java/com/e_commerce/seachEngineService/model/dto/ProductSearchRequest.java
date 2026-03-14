package com.e_commerce.seachEngineService.model.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProductSearchRequest {
    private String keyword;

    private String category;

    private Double minPrice;
    private Double maxPrice;

    private Boolean inStock;

    // example: color=red, size=9
    private Map<String, String> variants;

    @Builder.Default
    private int page = 0;
    @Builder.Default
    private int size = 20;

    private String sortBy;
}
