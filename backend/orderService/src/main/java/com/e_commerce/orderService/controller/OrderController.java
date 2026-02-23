package com.e_commerce.orderService.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.model.dto.PlaceOrderReqDTO;
import com.e_commerce.orderService.model.dto.OrderDetailsResponseDTO;
import com.e_commerce.orderService.model.dto.OrderStatusResponseDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryRequestDTO;
import com.e_commerce.orderService.model.dto.PriceSummaryResponseDTO;
import com.e_commerce.orderService.service.IOrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/")
@AllArgsConstructor
public class OrderController {

    private final IOrderService orderService;

    @PostMapping("/place-order")
    public ResponseEntity<UUID> placeOrder(Authentication authentication,
            @RequestBody PlaceOrderReqDTO placeOrderReq) {
        UUID val = orderService.placeOrder(authentication.getName(), placeOrderReq);
        return ResponseEntity.ok(val);
    }

    @PostMapping("/public/price-summary")
    public ResponseEntity<PriceSummaryResponseDTO> getPriceSummary(
            @RequestBody PriceSummaryRequestDTO priceSummaryRequestDTO) {
        PriceSummaryResponseDTO priceSummaryResponse = orderService.getPriceSummary(priceSummaryRequestDTO);
        return ResponseEntity.ok(priceSummaryResponse);
    }

    @GetMapping("/get-order-status/{orderId}")
    public ResponseEntity<OrderStatusResponseDTO> getOrderStatus(@PathVariable UUID orderId) {
        return ResponseEntity.ok(orderService.getOrderStatus(orderId));
    }

    @GetMapping("/{orderId}/merchant-key")
    public ResponseEntity<Map<String, String>> getGatewayMerchantKey(
            @PathVariable UUID orderId) {
        return ResponseEntity
                .ok(Map.of("key",
                        orderService.getGatewayMerchantKey(orderId)));
    }

    @GetMapping("/order-details/{orderId}")
    public ResponseEntity<OrderDetailsResponseDTO> getOrderDetails(@PathVariable UUID orderId) {
        return ResponseEntity.ok(orderService.getOrderDetailsById(orderId));
    }

    @GetMapping("/order-history/page/{page}/size/{size}")
    public ResponseEntity<Page<OrderDetailsResponseDTO>> getOrderHistory(
            @PathVariable int page, @PathVariable int size) {
        return null; // TODO: Implement pagination in order history retrieval
    }

    @PostMapping("/cancel-order-status/{orderId}")
    public ResponseEntity<Map<String, String>> cancelOrderStatus(@PathVariable UUID orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok(Map.of("message", "Order cancelled successfully"));
    }
}
