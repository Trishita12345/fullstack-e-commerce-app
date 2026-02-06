package com.e_commerce.orderService.service;

import com.e_commerce.common.model.dto.PlaceOrderReqDTO;

public interface IOrderService {
    void placeOrder(String userId, PlaceOrderReqDTO placeOrderReq);
}
