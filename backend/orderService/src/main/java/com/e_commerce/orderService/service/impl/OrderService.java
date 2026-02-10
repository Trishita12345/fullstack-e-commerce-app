package com.e_commerce.orderService.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.e_commerce.common.model.dto.CartDTO;
import com.e_commerce.common.model.dto.PlaceOrderReqDTO;
import com.e_commerce.common.model.dto.ProductPriceDTO;
import com.e_commerce.common.model.dto.ProductPriceDetailsDTO;
import com.e_commerce.common.model.dto.TotalProductPriceResponseDTO;
import com.e_commerce.common.model.event.OrderCreatedEvent;
import com.e_commerce.orderService.client.ICartClient;
import com.e_commerce.orderService.client.IOfferClient;
import com.e_commerce.orderService.client.IProductClient;
import com.e_commerce.orderService.kafka.OrderEventProducer;
import com.e_commerce.orderService.model.Order;
import com.e_commerce.orderService.model.OrderItem;
import com.e_commerce.orderService.model.dto.PriceSummaryRequestDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryResponseDTO;
import com.e_commerce.orderService.model.enums.OrderItemStatus;
import com.e_commerce.orderService.model.enums.OrderStatus;
import com.e_commerce.orderService.model.enums.PaymentStatus;
import com.e_commerce.orderService.repository.IOrderRepository;
import com.e_commerce.orderService.service.IOrderService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderService implements IOrderService {

        private final OrderEventProducer orderEventProducer;

        private final ICartClient cartClient;
        private final IProductClient productClient;
        private final IOfferClient offerClient;

        private final IOrderRepository orderRepository;

        private static final BigDecimal GIFT_WRAP_CHARGE = BigDecimal.valueOf(35);
        private static final BigDecimal SHIPPING_CHARGE = BigDecimal.valueOf(99);
        private static final BigDecimal MIN_PURCHASE_VALUE = BigDecimal.valueOf(999);
        private static final BigDecimal ZERO = BigDecimal.ZERO;

        private BigDecimal extractGstFromInclusive(BigDecimal price, BigDecimal gstPercent) {
                BigDecimal taxable = price
                                .multiply(BigDecimal.valueOf(100))
                                .divide(gstPercent.add(BigDecimal.valueOf(100)), 2, RoundingMode.HALF_UP);

                return price.subtract(taxable);
        }

        private BigDecimal fetchCouponPercent(PlaceOrderReqDTO req, BigDecimal totalPrice) {

                if (req.getSelectedCouponCode() == null)
                        return ZERO;

                return offerClient.getCouponDiscountPercent(
                                req.getSelectedCouponCode(),
                                totalPrice);
        }

        private BigDecimal calculateShippingFee(BigDecimal total) {
                return total.compareTo(MIN_PURCHASE_VALUE) < 0 ? SHIPPING_CHARGE : ZERO;
        }

        private BigDecimal calculateFinalCartAmount(BigDecimal total, PlaceOrderReqDTO req) {
                // shipping
                total = total.add(calculateShippingFee(total));

                // donation
                total = total.add(req.getDonation());

                // gift wrap
                if (req.getGiftWrap())
                        total = total.add(GIFT_WRAP_CHARGE);

                return total;
        }

        private BigDecimal calculateCouponDiscountAmount(BigDecimal total, BigDecimal couponPercent) {
                if (couponPercent.compareTo(ZERO) > 0) {
                        return total.multiply(couponPercent)
                                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                } else {
                        return BigDecimal.ZERO;
                }
        }

        private Order createOrder(String userId, BigDecimal amount, PlaceOrderReqDTO placeOrderReq,
                        BigDecimal shippingCharge) {
                return Order.builder()
                                .userId(userId)
                                .totalAmount(amount)
                                .couponCode(placeOrderReq.getSelectedCouponCode())
                                .donation(placeOrderReq.getDonation())
                                .giftWrapCharge(placeOrderReq.getGiftWrap() ? GIFT_WRAP_CHARGE : BigDecimal.ZERO)
                                .shippingCharge(shippingCharge)
                                .orderStatus(OrderStatus.PENDING)
                                .paymentStatus(PaymentStatus.PENDING)
                                .paymentMode(placeOrderReq.getPaymentMode())
                                .build();
        }

        private Set<OrderItem> buildOrderItems(Order order,
                        ProductPriceDTO productPriceDTO,
                        BigDecimal couponPercent,
                        BigDecimal expectedTotal) {

                Set<OrderItem> items = new HashSet<>();
                BigDecimal roundingAdjustment = BigDecimal.ZERO;
                BigDecimal totalCalculatedAmountItemWise = BigDecimal.ZERO;

                int itemCount = productPriceDTO.getPriceDetailsDTOs().size();
                int currentIndex = 0;

                for (ProductPriceDetailsDTO pp : productPriceDTO.getPriceDetailsDTOs()) {
                        currentIndex++;

                        BigDecimal unitSellingPrice = pp.getInventoryDiscountedPrice();
                        BigDecimal gstPercent = pp.getGstPercentage();

                        // BEFORE DISCOUNT
                        BigDecimal gstBefore = extractGstFromInclusive(unitSellingPrice, gstPercent);
                        BigDecimal taxableBefore = unitSellingPrice.subtract(gstBefore);

                        // COUPON DISTRIBUTION
                        BigDecimal discountAllocated = unitSellingPrice
                                        .multiply(couponPercent)
                                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

                        BigDecimal priceAfterDiscount = unitSellingPrice.subtract(discountAllocated);

                        // AFTER DISCOUNT
                        BigDecimal gstAfter = extractGstFromInclusive(priceAfterDiscount, gstPercent);
                        BigDecimal taxableAfter = priceAfterDiscount.subtract(gstAfter);
                        BigDecimal finalItemAmountPaid = priceAfterDiscount
                                        .multiply(BigDecimal.valueOf(pp.getQuantity()));

                        totalCalculatedAmountItemWise = totalCalculatedAmountItemWise
                                        .add(priceAfterDiscount.multiply(BigDecimal.valueOf(pp.getQuantity())));

                        // Apply rounding adjustment to last item
                        if (currentIndex == itemCount) {
                                // Get expected total (before rounding adjustment was applied)
                                roundingAdjustment = expectedTotal.subtract(totalCalculatedAmountItemWise);
                                finalItemAmountPaid = finalItemAmountPaid.add(roundingAdjustment);
                        }

                        items.add(OrderItem.builder()
                                        .order(order)
                                        .productItemId(pp.getProductItemId())
                                        .skuSnapshot(pp.getSku())
                                        .productName(pp.getProductName())
                                        .quantity(pp.getQuantity())
                                        .orderItemStatus(OrderItemStatus.CREATED)
                                        .unitBasePriceIncludingGST(pp.getInventoryBasePrice())
                                        .unitSellingPriceIncludingGST(unitSellingPrice)
                                        .taxableValueBeforeDiscount(taxableBefore)
                                        .discountAllocated(discountAllocated)
                                        .taxableValueAfterDiscount(taxableAfter)
                                        .gstAfterDiscount(gstAfter)
                                        .finalItemAmountPaid(finalItemAmountPaid)
                                        .build());
                }

                return items;
        }

        private void publishOrderCreatedEvent(Order order,
                        String userId,
                        BigDecimal amount,
                        CartDTO cart) {

                OrderCreatedEvent event = OrderCreatedEvent.builder()
                                .orderId(order.getId())
                                .userId(userId)
                                .amount(amount)
                                .items(cart.getSelectedCartItems())
                                .build();

                orderEventProducer.publishOrderCreated(event);
        }

        @Override
        @Transactional
        public BigDecimal placeOrderAndReserveInventory(String userId, PlaceOrderReqDTO placeOrderReq) {

                CartDTO cart = cartClient.getSelectedItemsInCart();

                ProductPriceDTO productPriceDTO = productClient.getPricesForPlaceOrder(cart.getSelectedCartItems());

                BigDecimal couponPercent = fetchCouponPercent(placeOrderReq, productPriceDTO.getTotalPrice());

                BigDecimal couponDiscountAmount = calculateCouponDiscountAmount(productPriceDTO.getTotalPrice(),
                                couponPercent);

                BigDecimal totalAmountAfterCouponDiscount = productPriceDTO.getTotalPrice()
                                .subtract(couponDiscountAmount);

                BigDecimal finalAmount = calculateFinalCartAmount(totalAmountAfterCouponDiscount, placeOrderReq);

                Order order = createOrder(userId, finalAmount, placeOrderReq,
                                calculateShippingFee(totalAmountAfterCouponDiscount));

                Set<OrderItem> items = buildOrderItems(order, productPriceDTO, couponPercent,
                                totalAmountAfterCouponDiscount);

                order.setOrderItems(items);
                orderRepository.save(order);

                publishOrderCreatedEvent(order, userId, finalAmount, cart);

                return finalAmount;
        }

        @Override
        public PriceSummaryResponseDTO getPriceSummary(PriceSummaryRequestDTO priceSummaryRequestDTO) {
                TotalProductPriceResponseDTO totalProductPriceResponseDTO = productClient
                                .getPrices(priceSummaryRequestDTO.getCartItems());

                BigDecimal totalBasePrice = totalProductPriceResponseDTO.getTotalBasePrice();
                BigDecimal totalDiscountedPriceBeforeCoupon = totalProductPriceResponseDTO.getTotalDiscountedPrice();
                BigDecimal discountAllocated = totalBasePrice
                                .subtract(totalDiscountedPriceBeforeCoupon);

                PlaceOrderReqDTO placeOrderReqDTO = priceSummaryRequestDTO.getPlaceOrderReqDTO();

                BigDecimal couponPercent = fetchCouponPercent(placeOrderReqDTO,
                                totalDiscountedPriceBeforeCoupon);
                BigDecimal couponDiscount = calculateCouponDiscountAmount(totalDiscountedPriceBeforeCoupon,
                                couponPercent);

                BigDecimal totalDiscountedPriceAfterCoupon = totalDiscountedPriceBeforeCoupon.subtract(couponDiscount);

                BigDecimal finalAmount = calculateFinalCartAmount(totalDiscountedPriceAfterCoupon, placeOrderReqDTO);

                return PriceSummaryResponseDTO.builder()
                                .itemsTotalMrp(totalBasePrice)
                                .productDiscount(discountAllocated)
                                .couponDiscount(couponDiscount)
                                .donation(placeOrderReqDTO.getDonation())
                                .giftWrapFee(
                                                placeOrderReqDTO.getGiftWrap() ? GIFT_WRAP_CHARGE : BigDecimal.ZERO)
                                .shippingFee(calculateShippingFee(totalDiscountedPriceAfterCoupon))
                                .amountToAvoidShippingFee(MIN_PURCHASE_VALUE.subtract(totalDiscountedPriceAfterCoupon))
                                .payableAmount(finalAmount)
                                .build();
        }

}
