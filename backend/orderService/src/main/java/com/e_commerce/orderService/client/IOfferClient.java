package com.e_commerce.orderService.client;

import java.math.BigDecimal;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@FeignClient(name = "offer-service", url = "${feign.client.offer-service.url}")
public interface IOfferClient {

    @GetMapping("/internal/offer/get-total-price-after-coupon")
    BigDecimal getTotalProductDiscountedPriceAfterCoupon(@RequestParam String couponCode, @RequestParam BigDecimal totalProductDiscountedPrice);
}
