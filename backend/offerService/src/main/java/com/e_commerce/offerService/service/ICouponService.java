package com.e_commerce.offerService.service;

import java.util.List;

import com.e_commerce.offerService.model.dto.CouponTypeDTO;

public interface ICouponService {
    List<CouponTypeDTO> getAllCoupons();
}
