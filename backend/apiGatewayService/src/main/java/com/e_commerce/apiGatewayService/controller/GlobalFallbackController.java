package com.e_commerce.apiGatewayService.controller;

import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;

import com.e_commerce.apiGatewayService.exception.BaseException;

import reactor.core.publisher.Mono;

@RestController
public class GlobalFallbackController {

    @RequestMapping("/fallback")
    public Mono<String> fallback(ServerWebExchange exchange) {

        Route route = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
        String routeId = route != null ? route.getId() : "service";

        return Mono.error(
                new BaseException(
                        routeId.toUpperCase() + " temporarily unavailable",
                        HttpStatus.SERVICE_UNAVAILABLE,
                        routeId.toUpperCase() + "_UNAVAILABLE"));
    }
}