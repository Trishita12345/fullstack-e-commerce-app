package com.e_commerce.orderService.service.impl;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.e_commerce.common.model.dto.CartDTO;
import com.e_commerce.common.model.dto.PlaceOrderReqDTO;
import com.e_commerce.orderService.client.ICartClient;
import com.e_commerce.orderService.client.IOfferClient;
import com.e_commerce.orderService.client.IProductClient;
import com.e_commerce.orderService.service.IOrderService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderService implements IOrderService {

    private final ICartClient cartClient;
    private final IProductClient productClient;
    private final IOfferClient offerClient;

    private static final BigDecimal GIFT_WRAP_CHARGE = BigDecimal.valueOf(35);
    private static final BigDecimal SHIPPING_CHARGE = BigDecimal.valueOf(99);
    private static final BigDecimal MIN_PURCHASE_VALUE = BigDecimal.valueOf(999);
    private static final BigDecimal ZERO = BigDecimal.ZERO;

    @Override
    public BigDecimal calculateFinalPrice(String userId, PlaceOrderReqDTO placeOrderReq) {
        CartDTO c = cartClient.getSelectedItemsInCart();
        BigDecimal totalProductDiscountedPrice = productClient.getPrices(c.getSelectedCartItems());
        BigDecimal totalProductDiscountedPriceAfterCoupon = totalProductDiscountedPrice;
        if (placeOrderReq.getSelectedCouponCode() != null) {
            totalProductDiscountedPriceAfterCoupon = offerClient.getTotalProductDiscountedPriceAfterCoupon(
                    placeOrderReq.getSelectedCouponCode(),
                    totalProductDiscountedPrice);
        }
        BigDecimal totalPrice = totalProductDiscountedPriceAfterCoupon
                .add(placeOrderReq.getDonation())
                .add(placeOrderReq.getGiftWrap() ? GIFT_WRAP_CHARGE : ZERO)
                .add(totalProductDiscountedPriceAfterCoupon.compareTo(MIN_PURCHASE_VALUE) < 0 ? SHIPPING_CHARGE : ZERO);
    
        return totalPrice;
    }

    @Override
    @Transactional
    public BigDecimal placeOrderAndReserveInventory(String userId, PlaceOrderReqDTO placeOrderReq) {
        
        // 1. Calculate final price (your existing logic)
        BigDecimal finalPrice = calculateFinalPrice(userId, placeOrderReq);
        return finalPrice;

        // 2. Reserve inventory
        // inventoryService.reserveStock(req.getItems());

        // 3. Create order
        // Order order = orderRepository.save(
        //         Order.createPendingPayment(userId, finalPrice)
        // );

        // return new PlaceOrderResponse(order.getId(), finalPrice);
    
    }

}
