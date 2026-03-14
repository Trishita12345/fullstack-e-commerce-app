package com.e_commerce.seachEngineService.model.dto;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;

import com.e_commerce.seachEngineService.model.ProductSearchDocument;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductSearchResponse {

    private Page<ProductSearchDocument> products;

    private Map<String, List<FacetValueDTO>> facets;

    private long total;
}
