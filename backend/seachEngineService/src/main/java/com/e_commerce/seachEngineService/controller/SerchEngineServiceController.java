package com.e_commerce.seachEngineService.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.seachEngineService.model.dto.ProductSearchRequest;
import com.e_commerce.seachEngineService.model.dto.ProductSearchResponse;
import com.e_commerce.seachEngineService.service.IProductSearchQueryService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/public")
@AllArgsConstructor
public class SerchEngineServiceController {

    private final IProductSearchQueryService searchQueryService;

    @GetMapping("/search")
    public ResponseEntity<ProductSearchResponse> searchProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false) List<String> variant,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String dir) {

        ProductSearchRequest request = ProductSearchRequest.builder()
                .keyword(q)
                .category(category)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .inStock(inStock)
                .variants(parseVariants(variant))
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .dir(dir)
                .build();

        return ResponseEntity.ok(searchQueryService.search(request));
    }

    private Map<String, String> parseVariants(List<String> variants) {

        Map<String, String> map = new HashMap<>();

        if (variants == null)
            return map;

        for (String v : variants) {
            String[] parts = v.split(":");
            map.put(parts[0], parts[1]);
        }

        return map;
    }
}