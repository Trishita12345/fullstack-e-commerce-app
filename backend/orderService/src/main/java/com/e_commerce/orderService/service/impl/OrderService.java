package com.e_commerce.orderService.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.e_commerce.common.model.dto.AddressDTO;
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
import com.e_commerce.orderService.client.IProfileClient;
import com.e_commerce.orderService.kafka.OrderEventProducer;
import com.e_commerce.orderService.model.Order;
import com.e_commerce.orderService.model.OrderItem;
import com.e_commerce.orderService.model.dto.OrderDetailsResponseDTO;
import com.e_commerce.orderService.model.dto.OrderItemSummaryForOrderDetails;
import com.e_commerce.orderService.model.dto.OrderStatusResponseDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryForOrderDetails;
import com.e_commerce.orderService.model.dto.PriceSummaryRequestDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryResponseDTO;
import com.e_commerce.orderService.model.dto.pdf.InvoiceData;
import com.e_commerce.orderService.model.dto.pdf.InvoiceItemData;
import com.e_commerce.orderService.model.enums.OrderItemStatus;
import com.e_commerce.orderService.model.enums.OrderStatus;
import com.e_commerce.orderService.model.enums.PaymentStatus;
import com.e_commerce.orderService.repository.IOrderRepository;
import com.e_commerce.orderService.service.IInvoicePdfGeneratorService;
import com.e_commerce.orderService.service.IOrderService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {

        private static final String GIFT_WRAP_CHARGES = "Gift Wrap Charges";
        private static final String DONATION = "Donation";
        private static final String SHIPPING_CHARGES = "Shipping Charges";
        private static final String MISC_FEE = "MISC_FEE";
        private static final String COUNTRY_CODE_INDIA = "+91-";
        private static final BigDecimal CGST6 = BigDecimal.valueOf(6);
        private static final BigDecimal SGST6 = BigDecimal.valueOf(6);

        @Value("${s3.public-url}")
        private String s3PublicUrl;

        private final OrderEventProducer orderEventProducer;
        private final IPaymentClient paymentClient;

        private final ICartClient cartClient;
        private final IProductClient productClient;
        private final IOfferClient offerClient;
        private final IProfileClient profileClient;

        private final IOrderRepository orderRepository;
        private final IInvoicePdfGeneratorService invoicePdfGeneratorService;

        private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd'th' MMM, yyyy");

        private BigDecimal extractGstFromInclusive(BigDecimal price, BigDecimal gstPercent) {
                BigDecimal taxable = price
                                .multiply(BigDecimal.valueOf(100))
                                .divide(gstPercent.add(BigDecimal.valueOf(100)), 2, RoundingMode.HALF_UP);

                return price.subtract(taxable);
        }

        private BigDecimal fetchCouponPercent(String selectedCouponCode, BigDecimal totalPrice) {

                if (selectedCouponCode == null)
                        return Constants.ZERO;

                return offerClient.getCouponDiscountPercent(
                                selectedCouponCode,
                                totalPrice);
        }

        private BigDecimal calculateShippingFee(BigDecimal total) {
                return total.compareTo(Constants.MIN_PURCHASE_VALUE) < 0 ? Constants.SHIPPING_CHARGE : Constants.ZERO;
        }

        private BigDecimal calculateFinalCartAmount(BigDecimal total, BigDecimal donation, Boolean giftWrap) {
                // shipping
                total = total.add(calculateShippingFee(total));

                // donation
                total = total.add(donation);

                // gift wrap
                if (giftWrap)
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

        private Order createOrder(String userId, PlaceOrderReqDTO placeOrderReq) {
                AddressDTO addressDetails = profileClient.getAddressDetailsById(placeOrderReq.getDeliveryAddressId());
                String fullAddress = addressDetails.getAddressLine1() + ", " +
                                (addressDetails.getAddressLine2() != null ? addressDetails.getAddressLine2() + ", "
                                                : "")
                                +
                                (addressDetails.getLandmark() != null ? addressDetails.getLandmark() + ", " : "") +
                                addressDetails.getCity() + ", " + addressDetails.getState() + " - " +
                                addressDetails.getPostalCode() + ", " + addressDetails.getCountry();
                return Order.builder()
                                .userId(userId)
                                // .totalAmount(BigDecimal.ZERO)
                                // .itemsTotalMrp(BigDecimal.ZERO)
                                // .itemsTotalMrpAfterDiscount(BigDecimal.ZERO)
                                // .couponDiscount(BigDecimal.ZERO)
                                .couponCode(placeOrderReq.getSelectedCouponCode())
                                .orderStatus(OrderStatus.CREATED)
                                .paymentStatus(PaymentStatus.NOT_INITIATED)
                                .deliveryName(addressDetails.getFullName())
                                .deliveryAddressDetails(fullAddress)
                                .contactNumber(addressDetails.getPhoneNumber())
                                .paymentMode(placeOrderReq.getPaymentMode())
                                .paymentGateway(placeOrderReq.getPaymentMode() == PaymentMode.COD ? null
                                                : placeOrderReq.getPaymentGateway())
                                .build();
        }

        private Set<OrderItem> buildOrderItems(Order order,
                        ProductPriceDTO productPriceDTO,
                        BigDecimal couponPercent) {

                Set<OrderItem> items = new HashSet<>();

                for (ProductPriceDetailsDTO pp : productPriceDTO.getPriceDetailsDTOs()) {

                        BigDecimal unitSellingPrice = pp.getInventoryDiscountedPrice();
                        BigDecimal gstPercent = pp.getGstPercentage();
                        BigDecimal cgstPercent = gstPercent.divide(BigDecimal.valueOf(2));
                        BigDecimal sgstPercent = gstPercent.divide(BigDecimal.valueOf(2));

                        BigDecimal unitCouponDiscountAllocated = unitSellingPrice
                                        .multiply(couponPercent)
                                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

                        BigDecimal unitFinalAmount = unitSellingPrice.subtract(unitCouponDiscountAllocated);

                        BigDecimal unitCgstAfterDiscount = extractGstFromInclusive(unitFinalAmount, cgstPercent);
                        BigDecimal unitSgstAfterDiscount = extractGstFromInclusive(unitFinalAmount, sgstPercent);
                        BigDecimal unitTotalGstAfterDiscount = unitCgstAfterDiscount.add(unitSgstAfterDiscount);
                        BigDecimal unitTaxableValueAfterDiscount = unitFinalAmount.subtract(unitTotalGstAfterDiscount);
                        BigDecimal totalFinalAmount = unitFinalAmount
                                        .multiply(BigDecimal.valueOf(pp.getQuantity()));

                        items.add(OrderItem.builder()
                                        .order(order)
                                        .productItemId(pp.getProductItemId())
                                        .skuSnapshot(pp.getSku())
                                        .productName(pp.getProductName())
                                        .productItemThumbnailImage(pp.getProductItemThumbnailImage())
                                        .quantity(pp.getQuantity())
                                        .orderItemStatus(OrderItemStatus.CREATED)
                                        .unitBasePriceIncludingGST(pp.getInventoryBasePrice())
                                        .unitSellingPriceIncludingGST(unitSellingPrice)
                                        .unitCouponDiscountAllocated(unitCouponDiscountAllocated)
                                        .unitTaxableValueAfterDiscount(unitTaxableValueAfterDiscount)
                                        .unitCgstAfterDiscount(unitCgstAfterDiscount)
                                        .unitSgstAfterDiscount(unitSgstAfterDiscount)
                                        .unitTotalGstAfterDiscount(unitTotalGstAfterDiscount)
                                        .unitFinalAmount(unitFinalAmount)
                                        .totalFinalAmount(totalFinalAmount)
                                        .cgst(cgstPercent)
                                        .sgst(sgstPercent)
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

        private OrderItem buildOtherOrderItems(Order order,
                        String name, BigDecimal amount) {

                BigDecimal cgst = extractGstFromInclusive(amount, CGST6);
                BigDecimal sgst = extractGstFromInclusive(amount, SGST6);
                BigDecimal totalGst = cgst.add(sgst);
                BigDecimal taxableValue = amount.subtract(totalGst);

                return OrderItem.builder()
                                .order(order)
                                .productItemId(UUID.randomUUID())
                                .skuSnapshot(MISC_FEE)
                                .productName(name)
                                .productItemThumbnailImage("-")
                                .quantity(1)
                                .orderItemStatus(OrderItemStatus.CREATED)
                                .unitBasePriceIncludingGST(amount)
                                .unitSellingPriceIncludingGST(amount)
                                .unitCouponDiscountAllocated(BigDecimal.ZERO)
                                .unitTaxableValueAfterDiscount(taxableValue)
                                .unitCgstAfterDiscount(cgst)
                                .unitSgstAfterDiscount(sgst)
                                .unitTotalGstAfterDiscount(totalGst)
                                .unitFinalAmount(amount)
                                .totalFinalAmount(amount)
                                .cgst(CGST6)
                                .sgst(SGST6)
                                .build();
        }

        @Override
        @Transactional
        public UUID placeOrder(String userId, PlaceOrderReqDTO placeOrderReq) {

                CartDTO cart = cartClient.getSelectedItemsInCart();

                ProductPriceDTO productPriceDTO = productClient.getPricesForPlaceOrder(cart.getSelectedCartItems());

                BigDecimal couponPercent = fetchCouponPercent(placeOrderReq.getSelectedCouponCode(),
                                productPriceDTO.getTotalPrice());

                Order order = createOrder(userId, placeOrderReq);

                Set<OrderItem> items = buildOrderItems(order, productPriceDTO, couponPercent);

                BigDecimal totalOrderItemsAmountBeforeMissFees = BigDecimal.ZERO;
                BigDecimal orderTotalMrp = BigDecimal.ZERO;
                BigDecimal orderTotalMrpAfterDiscount = BigDecimal.ZERO;
                BigDecimal orderTotalCouponDiscount = BigDecimal.ZERO;
                for (OrderItem item : items) {
                        totalOrderItemsAmountBeforeMissFees = totalOrderItemsAmountBeforeMissFees
                                        .add(item.getTotalFinalAmount());
                        orderTotalMrp = orderTotalMrp
                                        .add(item.getUnitBasePriceIncludingGST()
                                                        .multiply(BigDecimal.valueOf(item.getQuantity())));
                        orderTotalMrpAfterDiscount = orderTotalMrpAfterDiscount
                                        .add(item.getUnitSellingPriceIncludingGST()
                                                        .multiply(BigDecimal.valueOf(item.getQuantity())));
                        orderTotalCouponDiscount = orderTotalCouponDiscount
                                        .add(item.getUnitCouponDiscountAllocated()
                                                        .multiply(BigDecimal.valueOf(item.getQuantity())));
                }
                BigDecimal shippingFee = calculateShippingFee(totalOrderItemsAmountBeforeMissFees);
                BigDecimal finalAmount = calculateFinalCartAmount(totalOrderItemsAmountBeforeMissFees,
                                placeOrderReq.getDonation(), placeOrderReq.getGiftWrap());

                items.add(buildOtherOrderItems(order, SHIPPING_CHARGES, shippingFee));
                items.add(buildOtherOrderItems(order, DONATION, placeOrderReq.getDonation()));
                if (placeOrderReq.getGiftWrap()) {
                        items.add(buildOtherOrderItems(order, GIFT_WRAP_CHARGES, Constants.GIFT_WRAP_CHARGE));
                }

                order.setOrderItems(items);
                order.setTotalAmount(finalAmount);
                order.setItemsTotalMrp(orderTotalMrp);
                order.setItemsTotalMrpAfterDiscount(orderTotalMrpAfterDiscount);
                order.setCouponDiscount(orderTotalCouponDiscount);
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

                BigDecimal couponPercent = fetchCouponPercent(priceSummaryRequestDTO.getSelectedCouponCode(),
                                totalDiscountedPriceBeforeCoupon);
                BigDecimal couponDiscount = calculateCouponDiscountAmount(totalDiscountedPriceBeforeCoupon,
                                couponPercent);

                BigDecimal totalDiscountedPriceAfterCoupon = totalDiscountedPriceBeforeCoupon.subtract(couponDiscount);

                BigDecimal finalAmount = calculateFinalCartAmount(totalDiscountedPriceAfterCoupon,
                                priceSummaryRequestDTO.getDonation(), priceSummaryRequestDTO.getGiftWrap());

                return PriceSummaryResponseDTO.builder()
                                .itemsTotalMrp(totalBasePrice)
                                .productDiscount(discountAllocated)
                                .couponDiscount(couponDiscount)
                                .donation(priceSummaryRequestDTO.getDonation())
                                .giftWrapFee(
                                                priceSummaryRequestDTO.getGiftWrap() ? Constants.GIFT_WRAP_CHARGE
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
                                if (order.getPaymentMode() == PaymentMode.COD) {
                                        order.setOrderStatus(OrderStatus.CONFIRMED);
                                        orderRepository.save(order);
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
                                } else {
                                        orderRepository.save(order);
                                        orderEventProducer.publishOrderReserved(OrderReservedEvent.builder()
                                                        .orderId(order.getId())
                                                        .amount(order.getTotalAmount())
                                                        .paymentGateway(order.getPaymentGateway())
                                                        .userId(order.getUserId())
                                                        .build());
                                }
                        } else {
                                orderRepository.save(order);
                        }
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
                                .paymentMode(order.getPaymentMode().name())
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
        public void updatePaymentSuccess(PaymentStatusEvent event) {
                Order order = orderRepository.findById(event.getOrderId())
                                .orElseThrow(() -> new RuntimeException("Order not found: " + event.getOrderId()));
                if (order.getPaymentStatus() == PaymentStatus.SUCCESS
                                || order.getPaymentStatus() == PaymentStatus.FAILED) {
                        return; // Idempotency - ignore if payment status is already SUCCESS or FAILED
                }
                if (order.getOrderStatus() == OrderStatus.RESERVED) {
                        order.setPaymentStatus(PaymentStatus.SUCCESS);
                        order.setOrderStatus(OrderStatus.CONFIRMED);
                        order.getOrderItems().forEach(item -> item.setOrderItemStatus(OrderItemStatus.CONFIRMED));
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
                        orderRepository.save(order);
                } else {
                        // TODO: Handle this scenario - payment success received but order is not in
                        // RESERVED state. This can happen due to async nature of events. Possible
                        // solution - publish event for (like failing the order and refunding the
                        // payment) after a certain
                        // timeout.
                }
        }

        @Override
        public OrderDetailsResponseDTO getOrderDetailsById(UUID orderId) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
                return mapOrderToOrderDetailsResponseDTO(order);
        }

        private OrderDetailsResponseDTO mapOrderToOrderDetailsResponseDTO(Order order) {
                PriceSummaryForOrderDetails priceSummary = PriceSummaryForOrderDetails.builder()
                                .itemsTotalMrp(order.getItemsTotalMrp())
                                .itemsTotalMrpAfterDiscount(order.getItemsTotalMrpAfterDiscount())
                                .couponDiscount(order.getCouponDiscount())
                                .donation(getMiscFee(order, DONATION))
                                .giftWrapFee(getMiscFee(order, GIFT_WRAP_CHARGES))
                                .shippingFee(getMiscFee(order, SHIPPING_CHARGES))
                                .totalPaidAmount(order.getTotalAmount())
                                .build();
                List<OrderItemSummaryForOrderDetails> itemSummaries = order.getOrderItems().stream()
                                .filter(oi -> !oi.getSkuSnapshot().equals(MISC_FEE))
                                .map(oi -> OrderItemSummaryForOrderDetails.builder()
                                                .orderItemId(oi.getId())
                                                .sku(oi.getSkuSnapshot())
                                                .productName(oi.getProductName())
                                                .productImg(buildFullUrl(oi.getProductItemThumbnailImage()))
                                                .quantity(oi.getQuantity())
                                                .basePrice(oi.getUnitBasePriceIncludingGST())
                                                .sellingPrice(oi.getUnitSellingPriceIncludingGST())
                                                .couponDiscount(oi.getUnitCouponDiscountAllocated())
                                                .finalPrice(oi.getUnitFinalAmount())
                                                .build())
                                .toList();
                return OrderDetailsResponseDTO.builder()
                                .orderId(order.getId())
                                .orderStatus(order.getOrderStatus())
                                .createdAt(order.getCreatedAt().format(FORMATTER))
                                .updatedAt(order.getUpdatedAt().format(FORMATTER))
                                .paymentMode(order.getPaymentMode())
                                .paymentStatus(order.getPaymentStatus())
                                .priceSummary(priceSummary)
                                .deliveryAddressDetails(order.getDeliveryAddressDetails())
                                .deliveryName(order.getDeliveryName())
                                .contactNumber(COUNTRY_CODE_INDIA + order.getContactNumber())
                                .items(itemSummaries)
                                .build();
        }

        private BigDecimal getMiscFee(Order order, String name) {
                return order.getOrderItems().stream()
                                .filter(i -> i.getProductName().equals(name)).findFirst()
                                .map(OrderItem::getUnitFinalAmount)
                                .orElse(BigDecimal.ZERO);
        }

        public String buildFullUrl(String key) {
                if (key.startsWith("http")) {
                        return key;
                }
                return s3PublicUrl + "/" + key;
        }

        @Override
        public void abandonOrder(UUID orderId) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
                if (order.getOrderStatus() != OrderStatus.CONFIRMED) {
                        order.setOrderStatus(OrderStatus.FAILED);
                        order.setPaymentStatus(PaymentStatus.ABANDONED);
                        order.getOrderItems().forEach(item -> item.setOrderItemStatus(OrderItemStatus.FAILED));
                        orderRepository.save(order);
                        OrderFulfilledEvent orderFulfilledEvent = OrderFulfilledEvent.builder()
                                        .orderId(order.getId())
                                        .orderStatus(OrderStatus.FAILED.name())
                                        .items(order.getOrderItems().stream()
                                                        .map(o -> CartItemDTO.builder()
                                                                        .productItemId(o.getProductItemId())
                                                                        .quantity(o.getQuantity()).build())
                                                        .toList())
                                        .userId(order.getUserId())
                                        .build();
                        orderEventProducer.publishOrderFulfilled(orderFulfilledEvent);

                } else {
                        throw new RuntimeException("Only orders in CREATED or RESERVED state can be cancelled");
                }
        }

        @Override
        public byte[] downloadInvoice(UUID orderId) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                InvoiceData invoiceData = buildInvoiceData(order);
                return invoicePdfGeneratorService.generateInvoicePdf(invoiceData);

        }

        private InvoiceData buildInvoiceData(Order order) {
                List<InvoiceItemData> items = order.getOrderItems().stream()
                                .filter(oi -> oi.getTotalFinalAmount().compareTo(BigDecimal.ZERO) > 0)
                                .map(item -> InvoiceItemData.builder()
                                                .description(item.getProductName())
                                                .unitPrice(item.getUnitTaxableValueAfterDiscount().doubleValue())
                                                .quantity(item.getQuantity())
                                                .netAmount(item.getUnitFinalAmount().doubleValue())
                                                .cgstRate(item.getCgst().doubleValue())
                                                .cgstAmount(item.getUnitCgstAfterDiscount().doubleValue())
                                                .sgstRate(item.getSgst().doubleValue())
                                                .sgstAmount(item.getUnitSgstAfterDiscount().doubleValue())
                                                .totalTaxAmount(item.getUnitTotalGstAfterDiscount().doubleValue())
                                                .totalAmount(item.getTotalFinalAmount().doubleValue())
                                                .build())
                                .toList();

                return InvoiceData.builder()
                                .orderId(order.getId().toString())
                                .orderDate(order.getCreatedAt().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")))
                                .billingName(order.getDeliveryName())
                                .billingAddress(order.getDeliveryAddressDetails())
                                .shippingName(order.getDeliveryName())
                                .shippingAddress(order.getDeliveryAddressDetails())
                                .items(items)
                                .subtotal(order.getItemsTotalMrpAfterDiscount().doubleValue())
                                .discount(order.getCouponDiscount().doubleValue())
                                .totalAmount(order.getTotalAmount().doubleValue())
                                .amountInWords(InvoicePdfGeneratorService
                                                .convertAmountToWords(order.getTotalAmount().doubleValue()))
                                .build();
        }

        @Override
        public Page<OrderDetailsResponseDTO> getOrderDetailsList(int pageNum, String userId) {
                Pageable page = PageRequest.of(pageNum, 10, Sort.by("createdAt").descending());
                Page<Order> ordersPage = orderRepository.findByUserId(userId, page);
                return ordersPage.map(this::mapOrderToOrderDetailsResponseDTO);
        }
}