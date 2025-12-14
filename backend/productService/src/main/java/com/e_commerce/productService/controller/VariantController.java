package com.e_commerce.productService.controller;

import com.e_commerce.productService.model.dto.CategoryRequestDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/variant")
@AllArgsConstructor
public class VariantController {

    @PostMapping("/add")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<String> addVariant(@RequestBody CategoryRequestDTO categoryRequestDTO) {
        return ResponseEntity.ok("");
    }

}
