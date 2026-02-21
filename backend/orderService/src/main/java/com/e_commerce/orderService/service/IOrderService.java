package com.e_commerce.orderService.service;

import java.math.BigDecimal;
import java.util.UUID;

import com.e_commerce.common.model.dto.PlaceOrderReqDTO;
import com.e_commerce.common.model.event.PaymentCreatedEvent;
import com.e_commerce.common.model.event.PaymentStatusEvent;
import com.e_commerce.orderService.model.dto.OrderStatusResponseDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryRequestDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryResponseDTO;
import com.e_commerce.orderService.model.enums.OrderStatus;

public interface IOrderService {

    UUID placeOrder(String userId, PlaceOrderReqDTO placeOrderReq);

    PriceSummaryResponseDTO getPriceSummary(PriceSummaryRequestDTO priceSummaryRequestDTO);

    void updateOrderStatusAndPublish(UUID orderId, OrderStatus confirmed);

    OrderStatusResponseDTO getOrderStatus(UUID orderId);

    String getGatewayMerchantKey(UUID orderId);

    void updatePaymentInitiated(PaymentCreatedEvent event);

    void updatePaymentStatus(PaymentStatusEvent event);
}
