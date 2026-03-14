package com.e_commerce.productService.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.dto.CartItemDTO;
import com.e_commerce.common.model.dto.ProductPriceDTO;
import com.e_commerce.common.model.dto.TotalProductPriceResponseDTO;
import com.e_commerce.productService.service.IProductItemService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class InternalController {

    private final IProductItemService productItemService;

    @PostMapping("/internal/product/place-order/get-total-price")
    public ProductPriceDTO getSelectedItemsInCart(@RequestBody List<CartItemDTO> cartItems) {
        return productItemService.getTotalProductPriceForPlaceOrder(cartItems);
    }

    @PostMapping("/public/internal/product/get-total-price")
    public TotalProductPriceResponseDTO getTotalProductPrice(
            @RequestBody List<CartItemDTO> cartItems) {
        return productItemService.getTotalProductPrice(cartItems);
    }
}
