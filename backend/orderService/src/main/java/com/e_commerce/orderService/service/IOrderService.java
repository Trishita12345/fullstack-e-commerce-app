package com.e_commerce.orderService.service;

import java.math.BigDecimal;
import java.util.UUID;

import com.e_commerce.common.model.dto.PlaceOrderReqDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryRequestDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryResponseDTO;
import com.e_commerce.orderService.model.enums.OrderStatus;

public interface IOrderService {

    BigDecimal placeOrder(String userId, PlaceOrderReqDTO placeOrderReq);

    PriceSummaryResponseDTO getPriceSummary(PriceSummaryRequestDTO priceSummaryRequestDTO);

    void updateOrderStatus(UUID orderId, OrderStatus confirmed);
}
