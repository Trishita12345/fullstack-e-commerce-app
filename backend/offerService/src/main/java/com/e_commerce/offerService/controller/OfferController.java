package com.e_commerce.offerService.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.e_commerce.offerService.model.dto.CouponTypeDTO;
import com.e_commerce.offerService.service.IOfferService;

import java.util.List;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class OfferController {

    private final IOfferService offerService;

    @GetMapping(path = "/public/all-coupons")
    public List<CouponTypeDTO> getCoupons() {
        return offerService.getAllCoupons();
    }
}
