package com.e_commerce.apiGatewayService.filter;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import org.springframework.web.util.pattern.PathPattern;
import org.springframework.web.util.pattern.PathPatternParser;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
public class CookieToHeaderFilter implements WebFilter {
    private static final String ACCESS_TOKEN = "accessToken";

    public CookieToHeaderFilter() {
        System.out.println(">>> CookieToHeaderFilter LOADED <<<");
    }

    // private static final String[] WHITE_LIST = {
    // "/.well-known/",
    // "/actuator/",
    // "/error",
    // "/favicon.ico",
    // "/public/",
    // "/webjars/",
    // "/api/auth-service/",
    // "/swagger-ui/",
    // "/v3/api-docs/",
    // };

    // private boolean isWhiteListedUrl(ServerWebExchange exchange) {
    // String path = exchange.getRequest().getPath().value();

    // return Arrays.stream(WHITE_LIST)
    // .anyMatch(pattern -> path.contains(pattern));
    // }
    private static final String[] WHITE_LIST = {
            "/.well-known/**",
            "/favicon.ico",
            "/actuator/**",
            "/public/**",
            "/swagger-ui/**",
            "/webjars/**",
            "/v3/api-docs/**",
            "/api/product-service/public/**",
            "/api/product-service/swagger-ui/**",
            "/api/product-service/v3/api-docs/**",
            "/api/profile-service/public/**",
            "/api/profile-service/swagger-ui/**",
            "/api/profile-service/v3/api-docs/**",
            "/api/cart-service/public/**",
            "/api/cart-service/swagger-ui/**",
            "/api/cart-service/v3/api-docs/**",
            "/api/order-service/public/**",
            "/api/order-service/swagger-ui/**",
            "/api/order-service/v3/api-docs/**",
            "/api/offer-service/public/**",
            "/api/offer-service/swagger-ui/**",
            "/api/offer-service/v3/api-docs/**",
            "/api/payment-service/public/**",
            "/api/payment-service/swagger-ui/**",
            "/api/payment-service/v3/api-docs/**",
            "/api/notification-service/public/**",
            "/api/notification-service/swagger-ui/**",
            "/api/notification-service/v3/api-docs/**",
            "/api/search-service/public/**",
            "/api/search-service/swagger-ui/**",
            "/api/search-service/v3/api-docs/**",
            "/api/auth-service/**",
            "/error"
    };

    private static final AntPathMatcher matcher = new AntPathMatcher();

    private boolean isWhiteListedUrl(ServerWebExchange exchange) {
        String path = exchange.getRequest().getPath().value();

        return Arrays.stream(WHITE_LIST)
                .anyMatch(pattern -> matcher.match(pattern, path));
    }

    @SuppressWarnings("null")
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        HttpCookie cookie = exchange.getRequest()
                .getCookies()
                .getFirst(ACCESS_TOKEN);
        if (isWhiteListedUrl(exchange)) {
            return chain.filter(exchange);
        }
        if (cookie != null) {
            String token = cookie.getValue();

            ServerHttpRequest mutatedRequest = exchange.getRequest()
                    .mutate()
                    .headers(headers -> {
                        // ✅ only add if not already present
                        if (!headers.containsKey("Authorization")) {
                            headers.set("Authorization", "Bearer " + token);
                        }
                    })
                    .build();

            return chain.filter(exchange.mutate().request(mutatedRequest).build());
        }

        return chain.filter(exchange);
    }
}
