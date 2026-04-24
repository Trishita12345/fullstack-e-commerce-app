package com.e_commerce.orderService.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.e_commerce.common.config.FeignConfig;
import com.e_commerce.common.model.dto.CartDTO;

@FeignClient(
        name = "cart-service", 
        url = "${feign.client.cart-service.url}", 
        configuration = FeignConfig.class
    )
public interface ICartClient {
    
    @GetMapping("/internal/cart/selected-items")
    CartDTO getSelectedItemsInCart();

    @GetMapping("/internal/demo")
    String demoCartServiceCall();
}
