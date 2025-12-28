package com.e_commerce.productService.controller;

import com.e_commerce.productService.model.dto.common.PageRequestDTO;
import com.e_commerce.productService.model.dto.product.ProductDTO;
import com.e_commerce.productService.model.dto.product.ProductFilterDTO;
import com.e_commerce.productService.model.dto.product.ProductListingResponseDTO;
import com.e_commerce.productService.service.IProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/product")
@AllArgsConstructor
public class ProductController {

    private final IProductService productService;


    @PostMapping("/page")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Page<ProductListingResponseDTO>> getAllProducts(
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestBody PageRequestDTO<ProductFilterDTO> pageRequestDTO
    ) {
        return ResponseEntity.ok(productService.getAllProducts(query, pageRequestDTO));
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ProductDTO> addProduct(
            @RequestBody @Valid ProductDTO productDTO
    ) {
        return ResponseEntity.ok(productService.addProduct(productDTO));
    }


    @GetMapping("/{productId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ProductDTO> getProductById(
            @PathVariable UUID productId
    ) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @PutMapping("/{productId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ProductDTO> editProductById(
            @PathVariable UUID productId,
            @RequestBody @Valid ProductDTO productDTO
    ) {
        return ResponseEntity.ok(productService.editProductById(productId, productDTO));
    }
}
