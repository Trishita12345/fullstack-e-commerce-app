package com.e_commerce.orderService.service;

import java.math.BigDecimal;

import com.e_commerce.common.model.dto.PlaceOrderReqDTO;

public interface IOrderService {
    BigDecimal calculateFinalPrice(String userId, PlaceOrderReqDTO placeOrderReq);

    void placeOrderAndReserveInventory(String name, PlaceOrderReqDTO placeOrderReq);
}
