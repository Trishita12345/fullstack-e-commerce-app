package com.e_commerce.orderService.service;

import com.e_commerce.common.model.dto.CartDTO;

public interface IOrderService {
    CartDTO placeOrder(String userId);
}
