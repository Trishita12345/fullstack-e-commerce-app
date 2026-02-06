package com.e_commerce.offerService.service.impl;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.e_commerce.offerService.model.Offer;
import com.e_commerce.offerService.model.dto.CouponTypeDTO;
import com.e_commerce.offerService.repository.IOfferRepository;
import com.e_commerce.offerService.service.IOfferService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OfferService implements IOfferService {

    private final IOfferRepository offerRepository;
    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("dd'th' MMMM yyyy | hh:mm a");

    @Override
    public List<CouponTypeDTO> getAllCoupons() {
        return offerRepository.findActiveCoupons()
                .stream()
                .map(c -> mapToDto(c))
                .toList();
    }

    private CouponTypeDTO mapToDto(Offer offer) {
        return CouponTypeDTO.builder()
                .couponCode(offer.getCouponCode())
                .discountPercent(offer.getDiscountPercent())
                .description(offer.getDescription())
                .expiresOn(offer.getExpiresOn().format(FORMATTER))
                .minPurchaseAmount(offer.getMinPurchaseAmount())
                .build();
    }
    
}
