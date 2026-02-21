package com.e_commerce.orderService.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.e_commerce.common.model.dto.CartDTO;
import com.e_commerce.common.model.dto.CartItemDTO;
import com.e_commerce.common.model.dto.PlaceOrderReqDTO;
import com.e_commerce.common.model.dto.ProductPriceDTO;
import com.e_commerce.common.model.dto.ProductPriceDetailsDTO;
import com.e_commerce.common.model.dto.TotalProductPriceResponseDTO;
import com.e_commerce.common.model.enums.PaymentMode;
import com.e_commerce.common.model.event.OrderCreatedEvent;
import com.e_commerce.common.model.event.OrderFulfilledEvent;
import com.e_commerce.common.model.event.OrderReservedEvent;
import com.e_commerce.common.model.event.PaymentCreatedEvent;
import com.e_commerce.common.model.event.PaymentStatusEvent;
import com.e_commerce.common.utils.Constants;
import com.e_commerce.orderService.client.ICartClient;
import com.e_commerce.orderService.client.IOfferClient;
import com.e_commerce.orderService.client.IPaymentClient;
import com.e_commerce.orderService.client.IProductClient;
import com.e_commerce.orderService.kafka.OrderEventProducer;
import com.e_commerce.orderService.model.Order;
import com.e_commerce.orderService.model.OrderItem;
import com.e_commerce.orderService.model.dto.OrderStatusResponseDTO;
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
        private final IPaymentClient paymentClient;

        private final ICartClient cartClient;
        private final IProductClient productClient;
        private final IOfferClient offerClient;

        private final IOrderRepository orderRepository;

        private BigDecimal extractGstFromInclusive(BigDecimal price, BigDecimal gstPercent) {
                BigDecimal taxable = price
                                .multiply(BigDecimal.valueOf(100))
                                .divide(gstPercent.add(BigDecimal.valueOf(100)), 2, RoundingMode.HALF_UP);

                return price.subtract(taxable);
        }

        private BigDecimal fetchCouponPercent(PlaceOrderReqDTO req, BigDecimal totalPrice) {

                if (req.getSelectedCouponCode() == null)
                        return Constants.ZERO;

                return offerClient.getCouponDiscountPercent(
                                req.getSelectedCouponCode(),
                                totalPrice);
        }

        private BigDecimal calculateShippingFee(BigDecimal total) {
                return total.compareTo(Constants.MIN_PURCHASE_VALUE) < 0 ? Constants.SHIPPING_CHARGE : Constants.ZERO;
        }

        private BigDecimal calculateFinalCartAmount(BigDecimal total, PlaceOrderReqDTO req) {
                // shipping
                total = total.add(calculateShippingFee(total));

                // donation
                total = total.add(req.getDonation());

                // gift wrap
                if (req.getGiftWrap())
                        total = total.add(Constants.GIFT_WRAP_CHARGE);

                return total;
        }

        private BigDecimal calculateCouponDiscountAmount(BigDecimal total, BigDecimal couponPercent) {
                if (couponPercent.compareTo(Constants.ZERO) > 0) {
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
                                .giftWrapCharge(placeOrderReq.getGiftWrap() ? Constants.GIFT_WRAP_CHARGE
                                                : BigDecimal.ZERO)
                                .shippingCharge(shippingCharge)
                                .orderStatus(OrderStatus.CREATED)
                                .paymentStatus(PaymentStatus.NOT_INITIATED)
                                .paymentMode(placeOrderReq.getPaymentMode())
                                .paymentGateway(placeOrderReq.getPaymentMode() == PaymentMode.COD ? null
                                                : placeOrderReq.getPaymentGateway())
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
        public UUID placeOrder(String userId, PlaceOrderReqDTO placeOrderReq) {

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

                return order.getId();
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
                                                placeOrderReqDTO.getGiftWrap() ? Constants.GIFT_WRAP_CHARGE
                                                                : BigDecimal.ZERO)
                                .shippingFee(calculateShippingFee(totalDiscountedPriceAfterCoupon))
                                .amountToAvoidShippingFee(
                                                Constants.MIN_PURCHASE_VALUE.subtract(totalDiscountedPriceAfterCoupon))
                                .payableAmount(finalAmount)
                                .build();
        }

        @Transactional
        @Override
        public void updateOrderStatusAndPublish(UUID orderId, OrderStatus status) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
                if (order.getOrderStatus() == OrderStatus.CREATED) {
                        order.getOrderItems().forEach(item -> {
                                if (status == OrderStatus.RESERVED) {
                                        item.setOrderItemStatus(OrderItemStatus.RESERVED);

                                } else if (status == OrderStatus.FAILED) {
                                        item.setOrderItemStatus(OrderItemStatus.FAILED);
                                }
                        });
                        order.setOrderStatus(status);
                        if (status == OrderStatus.RESERVED) {
                                order.setPaymentStatus(PaymentStatus.PENDING);
                        }
                        orderRepository.save(order);
                        orderEventProducer.publishOrderReserved(OrderReservedEvent.builder()
                                        .orderId(order.getId())
                                        .amount(order.getTotalAmount())
                                        .paymentGateway(order.getPaymentGateway())
                                        .userId(order.getUserId())
                                        .build());
                } else {
                        return; // Ignore if order is not in CREATED state (idempotency)
                }
        }

        @Override
        public OrderStatusResponseDTO getOrderStatus(UUID orderId) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
                return OrderStatusResponseDTO.builder()
                                .orderId(orderId)
                                .orderStatus(order.getOrderStatus().name())
                                .paymentStatus(order.getPaymentStatus().name())
                                .transactionId(order.getTransactionId())
                                .gatewayOrderId(order.getGatewayOrderId())
                                .amount(order.getTotalAmount())
                                .build();
        }

        @Override
        public String getGatewayMerchantKey(UUID orderId) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
                if (order.getPaymentGateway() != null)
                        return paymentClient.getGatewayMerchantKey(order.getPaymentGateway().name());
                else
                        throw new RuntimeException("Payment gateway not set for order: " + orderId);
        }

        @Override
        public void updatePaymentInitiated(PaymentCreatedEvent event) {
                Order order = orderRepository.findById(event.getOrderId())
                                .orElseThrow(() -> new RuntimeException("Order not found: " + event.getOrderId()));
                order.setPaymentStatus(PaymentStatus.INITIATED);
                order.setTransactionId(event.getTransactionId());
                order.setGatewayOrderId(event.getGatewayOrderId());
                orderRepository.save(order);
        }

        @Override
        public void updatePaymentStatus(PaymentStatusEvent event) {
                Order order = orderRepository.findById(event.getOrderId())
                                .orElseThrow(() -> new RuntimeException("Order not found: " + event.getOrderId()));
                if (order.getPaymentStatus() == PaymentStatus.SUCCESS
                                || order.getPaymentStatus() == PaymentStatus.FAILED) {
                        return; // Idempotency - ignore if payment status is already SUCCESS or FAILED
                } else if (event.getPaymentStatus().equalsIgnoreCase(PaymentStatus.SUCCESS.name())) {
                        order.setPaymentStatus(PaymentStatus.SUCCESS);
                        order.setOrderStatus(OrderStatus.CONFIRMED);
                        List<CartItemDTO> cartItems = order.getOrderItems().stream()
                                        .map(o -> CartItemDTO.builder()
                                                        .productItemId(o.getProductItemId())
                                                        .quantity(o.getQuantity()).build())
                                        .toList();
                        OrderFulfilledEvent orderFulfilledEvent = OrderFulfilledEvent.builder()
                                        .orderId(order.getId())
                                        .orderStatus(OrderStatus.CONFIRMED.name())
                                        .items(cartItems)
                                        .userId(order.getUserId())
                                        .build();
                        orderEventProducer.publishOrderFulfilled(orderFulfilledEvent);
                } else if (event.getPaymentStatus().equalsIgnoreCase(PaymentStatus.FAILED.name())) {
                        order.setPaymentStatus(PaymentStatus.FAILED);
                        order.setOrderStatus(OrderStatus.FAILED);
                        OrderFulfilledEvent orderFulfilledEvent = OrderFulfilledEvent.builder()
                                        .orderId(order.getId())
                                        .orderStatus(OrderStatus.FAILED.name())
                                        .build();
                        orderEventProducer.publishOrderFulfilled(orderFulfilledEvent);
                }

                orderRepository.save(order);
        }

}
