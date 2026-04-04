package com.e_commerce.apiGatewayService.filter;

import java.util.Arrays;

import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
public class CookieToHeaderFilter implements WebFilter {
    private static final String ACCESS_TOKEN = "accessToken";

    public CookieToHeaderFilter() {
        System.out.println(">>> CookieToHeaderFilter LOADED <<<");
    }

    private static final String[] WHITE_LIST = {
            "/.well-known/",
            "/actuator/",
            "/error",
            "/favicon.ico",
            "/public/",
            "/webjars/",
            "/api/auth-service/",
            "/swagger-ui/",
            "/v3/api-docs/",
    };

    private boolean isWhiteListedUrl(ServerWebExchange exchange) {
        String path = exchange.getRequest().getPath().value();

        return Arrays.stream(WHITE_LIST)
                .anyMatch(pattern -> path.contains(pattern));
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
                    .header("Authorization", "Bearer " + token)
                    .build();

            return chain.filter(exchange.mutate().request(mutatedRequest).build());
        }

        return chain.filter(exchange);
    }
}
