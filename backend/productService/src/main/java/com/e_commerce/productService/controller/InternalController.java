package com.e_commerce.productService.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.dto.CartItemDTO;
import com.e_commerce.productService.service.IProductItemService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/internal")
@AllArgsConstructor
public class InternalController {

    private final IProductItemService productItemService;

    @PostMapping("/product/get-total-price")
    public BigDecimal getSelectedItemsInCart(@RequestBody List<CartItemDTO> cartItems) {
        return productItemService.getTotalProductPriceForPlaceOrder(cartItems);
    }
}
