package com.e_commerce.offerService.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.e_commerce.offerService.model.Coupon;
import com.e_commerce.offerService.model.dto.CouponTypeDTO;
import com.e_commerce.offerService.repository.ICouponRepository;
import com.e_commerce.offerService.service.ICouponService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OfferService implements ICouponService {

    private final ICouponRepository couponRepository;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd'th' MMMM yyyy | hh:mm a");

    @Override
    public List<CouponTypeDTO> getAllCoupons() {
        return couponRepository.findActiveCoupons()
                .stream()
                .map(c -> mapToDto(c))
                .toList();
    }

    private CouponTypeDTO mapToDto(Coupon coupon) {
        return CouponTypeDTO.builder()
                .couponCode(coupon.getCouponCode())
                .discountPercent(coupon.getDiscountPercent())
                .description(coupon.getDescription())
                .expiresOn(coupon.getExpiresOn().format(FORMATTER))
                .minPurchaseAmount(coupon.getMinPurchaseAmount())
                .build();
    }

    @Override
    public BigDecimal getTotalProductDiscountedPriceAfterCoupon(
            String couponCode,
            BigDecimal totalProductDiscountedPrice) {

        Coupon coupon = couponRepository
                .getActiveCouponByCouponCode(couponCode)
                .orElseThrow(() -> new RuntimeException("Coupon does not exist"));

        if (coupon.getMinPurchaseAmount()
                .compareTo(totalProductDiscountedPrice) > 0) {

            BigDecimal remainingAmount = coupon.getMinPurchaseAmount()
                    .subtract(totalProductDiscountedPrice);

            throw new RuntimeException(
                    "Please shop " + remainingAmount + " more to apply the coupon.");
        }

        BigDecimal discountPercent = BigDecimal.valueOf(coupon.getDiscountPercent());

        BigDecimal discountAmount = totalProductDiscountedPrice
                .multiply(discountPercent)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        return totalProductDiscountedPrice.subtract(discountAmount);
    }

}
