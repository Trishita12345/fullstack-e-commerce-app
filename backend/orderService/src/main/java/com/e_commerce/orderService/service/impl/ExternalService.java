package com.e_commerce.orderService.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.e_commerce.common.exception.BaseException;
import com.e_commerce.common.model.dto.AddressDTO;
import com.e_commerce.common.model.dto.CartDTO;
import com.e_commerce.common.model.dto.CartItemDTO;
import com.e_commerce.common.model.dto.ProductPriceDTO;
import com.e_commerce.common.model.dto.TotalProductPriceResponseDTO;
import com.e_commerce.common.model.dto.UserInfoDTO;
import com.e_commerce.orderService.client.ICartClient;
import com.e_commerce.orderService.client.IOfferClient;
import com.e_commerce.orderService.client.IPaymentClient;
import com.e_commerce.orderService.client.IProductClient;
import com.e_commerce.orderService.client.IProfileClient;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExternalService {

    private final IProductClient productClient;
    private final IOfferClient offerClient;
    private final IProfileClient profileClient;
    private final IPaymentClient paymentClient;
    private final ICartClient cartClient;

    // ---------------- PRODUCT ----------------
    @CircuitBreaker(name = "productService", fallbackMethod = "productFallback")
    @Retry(name = "productService")
    public ProductPriceDTO getPricesForPlaceOrder(List<CartItemDTO> items) {
        return productClient.getPricesForPlaceOrder(items);
    }

    @CircuitBreaker(name = "productService", fallbackMethod = "productFallback")
    @Retry(name = "productService")
    public TotalProductPriceResponseDTO getPrices(List<CartItemDTO> items) {
        return productClient.getPrices(items);
    }

    public TotalProductPriceResponseDTO productFallback(List<CartItemDTO> items, Exception ex) {
        throw new BaseException(
                "Product service unavailable",
                HttpStatus.SERVICE_UNAVAILABLE,
                "PRODUCT_SERVICE_DOWN");
    }

    // ---------------- COUPON ----------------
    @Retry(name = "offerService", fallbackMethod = "couponFallback")
    public BigDecimal getCouponDiscountPercent(String code, BigDecimal total) {
        return offerClient.getCouponDiscountPercent(code, total);
    }

    public BigDecimal couponFallback(String code, BigDecimal total, Exception ex) {
        return BigDecimal.ZERO; // graceful degradation
    }

    // ---------------- PROFILE ----------------
    @CircuitBreaker(name = "profileService", fallbackMethod = "profileFallback")
    @Retry(name = "profileService")
    public AddressDTO getAddressDetailsById(UUID addressId) {
        return profileClient.getAddressDetailsById(addressId);
    }

    public AddressDTO profileFallback(UUID addressId, Exception ex) {
        throw new BaseException("Profile service unavailable", HttpStatus.SERVICE_UNAVAILABLE, "PROFILE_SERVICE_DOWN");
    }

    @Retry(name = "profileService", fallbackMethod = "userInfoFallback")
    public UserInfoDTO getUserInfo(String userId) {
        return profileClient.getUserInfo(userId);
    }

    public UserInfoDTO userInfoFallback(String userId, Exception ex) {
        return null;

    }

    // ---------------- PAYMENT ----------------
    @CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
    public String getGatewayMerchantKey(String gateway) {
        return paymentClient.getGatewayMerchantKey(gateway);
    }

    public String paymentFallback(String gateway, Exception ex) {
        throw new BaseException("Payment service unavailable", HttpStatus.SERVICE_UNAVAILABLE, "PAYMENT_SERVICE_DOWN");
    }

    // ---------------- CART ----------------
    @CircuitBreaker(name = "cartService", fallbackMethod = "cartFallback")
    public CartDTO getSelectedItemsInCart() {
        return cartClient.getSelectedItemsInCart();
    }

    public CartDTO cartFallback(Exception ex) {
        throw new BaseException("Cart service unavailable", HttpStatus.SERVICE_UNAVAILABLE, "CART_SERVICE_DOWN");
    }
}
