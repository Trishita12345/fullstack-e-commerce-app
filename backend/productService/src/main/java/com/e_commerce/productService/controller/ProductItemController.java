package com.e_commerce.productService.controller;

import com.e_commerce.productService.model.dto.productItem.ProductItemDTO;
import com.e_commerce.productService.model.dto.productItem.ProductItemListingDTO;
import com.e_commerce.productService.model.dto.variant.ProductVariantAttributesDTO;
import com.e_commerce.productService.service.IProductItemService;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/productItem")
@AllArgsConstructor
public class ProductItemController {

    private IProductItemService productItemService;

    @GetMapping("/{productId}/variant-attributes")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<ProductVariantAttributesDTO>> getVariantAttributesByCategoryId(
            @PathVariable UUID productId) {
        return ResponseEntity.ok(productItemService.getVariantAttributesByCategoryId(productId));
    }

    @PostMapping("/add/{productId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<UUID> addProductItem(@PathVariable UUID productId,
            @RequestBody ProductItemDTO productItemDTO) {
        UUID id = productItemService.addProductItem(productId, productItemDTO);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/{productItemId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<ProductItemDTO> getProductItemById(@PathVariable UUID productItemId) {
        return ResponseEntity.ok(productItemService.getProductItemById(productItemId));
    }

    @GetMapping("/{productId}/page")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Page<ProductItemListingDTO>> getProductItemListing(
            @PathVariable UUID productId,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "5") int size,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String direction,
            @RequestParam(required = false, defaultValue = "") String filter) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity
                .ok(productItemService.getProductItemListing(productId, pageable, filter, page, size, sortBy,
                        direction));
    }

    @DeleteMapping("/{productItemId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Void> deleteProductItemById(@PathVariable UUID productItemId) {
        productItemService.deleteProductItemById(productItemId);
        return ResponseEntity.noContent().build();
    }

}
