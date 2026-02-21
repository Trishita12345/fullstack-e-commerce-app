package com.e_commerce.orderService.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "payment-service", url = "${feign.client.payment-service.url}")
public interface IPaymentClient {

    @GetMapping("/{paymentGateway}/key")
    String getGatewayMerchantKey(@PathVariable String paymentGateway);
}
