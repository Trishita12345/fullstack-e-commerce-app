package com.e_commerce.offerService.service;

import java.math.BigDecimal;
import java.util.List;

import com.e_commerce.offerService.model.dto.CouponTypeDTO;

public interface ICouponService {
    List<CouponTypeDTO> getAllCoupons();

    BigDecimal getCouponDiscountPercent(String couponCode, BigDecimal totalProductDiscountedPrice);
}
