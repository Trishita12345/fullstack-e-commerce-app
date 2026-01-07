package com.e_commerce.productService.controller.customer;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.productService.model.dto.customer.CategoryResponseDTOLanding;
import com.e_commerce.productService.service.ICategoryService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/public/categories")
public class CustomerCategoryController {
    private final ICategoryService categoryService;

    @GetMapping("/leaf")
    public ResponseEntity<List<CategoryResponseDTOLanding>> getLeafCategories() {
        return ResponseEntity.ok(categoryService.getLeafCategoriesCustomer());
    }

}
