package com.e_commerce.productService.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.productService.service.IProductDataIngestionService;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/index")
@RequiredArgsConstructor
public class ProductIndexController {

    private final IProductDataIngestionService productDataIngestionService;

    @GetMapping("/ingest-product-data")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<String> IngestProductData() {

        productDataIngestionService.ingestProductDataToSearchIndex();
        return ResponseEntity.accepted()
                .body("Product data ingestion initiated. Check logs for details.");
    }

    @GetMapping("/ingest-product-data/{productItemId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<String> ingestProductDataById(@PathVariable UUID productItemId) {
        productDataIngestionService.ingestProductDataToSearchIndexById(productItemId);
        return ResponseEntity
                .ok("Product data ingested for product item ID: " + productItemId + ". Check logs for details.");
    }

    @DeleteMapping("/delete-product-data/{productItemId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<String> deleteProductDataById(@PathVariable UUID productItemId) {
        productDataIngestionService.deleteProductDataToSearchIndexById(productItemId);
        return ResponseEntity
                .ok("Product data deleted for product item ID: " + productItemId + ". Check logs for details.");
    }

}
