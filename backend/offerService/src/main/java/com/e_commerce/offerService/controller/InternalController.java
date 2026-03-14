package com.e_commerce.offerService.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.offerService.service.ICouponService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/internal")
@AllArgsConstructor
public class InternalController {

    private final ICouponService couponService;

    @GetMapping("/offer/get-coupon-discount-percent")
    public BigDecimal getTotalProductDiscountedPriceAfterCoupon(@RequestParam String couponCode,
            @RequestParam BigDecimal totalProductDiscountedPrice) {
        return couponService.getCouponDiscountPercent(couponCode, totalProductDiscountedPrice);
    }
}
