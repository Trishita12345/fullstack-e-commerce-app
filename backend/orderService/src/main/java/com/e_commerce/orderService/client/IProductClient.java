package com.e_commerce.orderService.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.e_commerce.common.model.dto.CartItemDTO;
import com.e_commerce.common.model.dto.ProductPriceDTO;
import com.e_commerce.common.model.dto.TotalProductPriceResponseDTO;

@FeignClient(name = "product-service", url = "${feign.client.product-service.url}")
public interface IProductClient {

    @PostMapping("/internal/product/place-order/get-total-price")
    ProductPriceDTO getPricesForPlaceOrder(@RequestBody List<CartItemDTO> cartItems);

    @PostMapping("/public/internal/product/get-total-price")
    TotalProductPriceResponseDTO getPrices(@RequestBody List<CartItemDTO> cartItems);
}
