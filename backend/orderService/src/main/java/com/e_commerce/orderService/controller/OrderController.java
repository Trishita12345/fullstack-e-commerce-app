package com.e_commerce.orderService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.dto.PlaceOrderReqDTO;
import com.e_commerce.orderService.service.IOrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/")
@AllArgsConstructor
public class OrderController {

    private final IOrderService orderService;
    @PostMapping("/place-order")
    public ResponseEntity<Void> placeOrder(Authentication authentication, @RequestBody PlaceOrderReqDTO placeOrderReq) {
        orderService.placeOrder(authentication.getName(), placeOrderReq);
        return ResponseEntity.ok().build();
    }
}
