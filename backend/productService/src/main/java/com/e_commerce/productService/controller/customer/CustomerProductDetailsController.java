package com.e_commerce.productService.controller.customer;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.productService.model.dto.customer.ProductDetailsDTO;
import com.e_commerce.productService.service.IProductItemService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/public/products")
public class CustomerProductDetailsController {

    private final IProductItemService productItemService;

    @GetMapping("/{productItemId}")
    public ResponseEntity<ProductDetailsDTO> getProductDetails(
            @PathVariable UUID productItemId) {
        return ResponseEntity.ok(productItemService.getProductDetailsByProductItemId(productItemId));
    }
}
