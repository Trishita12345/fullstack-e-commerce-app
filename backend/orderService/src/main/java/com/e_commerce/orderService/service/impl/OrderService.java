package com.e_commerce.orderService.service.impl;

import org.springframework.stereotype.Service;

import com.e_commerce.common.model.dto.CartDTO;
import com.e_commerce.common.model.dto.PlaceOrderReqDTO;
import com.e_commerce.orderService.client.ICartClient;
import com.e_commerce.orderService.client.IProductClient;
import com.e_commerce.orderService.service.IOrderService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderService implements IOrderService{

    private final ICartClient cartClient;
    private final IProductClient productClient;
    @Override
    public void placeOrder(String userId, PlaceOrderReqDTO placeOrderReq) {
        CartDTO c = cartClient.getSelectedItemsInCart();
        // productClient.getSelectedItemsInCart();
    }
    
}
