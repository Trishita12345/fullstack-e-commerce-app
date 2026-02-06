package com.e_commerce.offerService.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.e_commerce.offerService.model.dto.CouponTypeDTO;
import com.e_commerce.offerService.service.ICouponService;

import java.util.List;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class couponController {

    private final ICouponService couponService;

    @GetMapping(path = "/public/all-coupons")
    public List<CouponTypeDTO> getCoupons() {
        return couponService.getAllCoupons();
    }
}
