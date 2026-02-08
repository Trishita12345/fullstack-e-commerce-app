package com.e_commerce.orderService.service;

import java.math.BigDecimal;

import com.e_commerce.common.model.dto.PlaceOrderReqDTO;

public interface IOrderService {

    BigDecimal placeOrderAndReserveInventory(String userId, PlaceOrderReqDTO placeOrderReq);
}
