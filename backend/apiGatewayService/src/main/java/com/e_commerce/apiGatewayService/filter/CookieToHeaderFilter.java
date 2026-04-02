package com.e_commerce.apiGatewayService.filter;

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

    @SuppressWarnings("null")
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        HttpCookie cookie = exchange.getRequest()
                .getCookies()
                .getFirst(ACCESS_TOKEN);
        if (exchange.getRequest().getPath().toString().contains("/api/auth-service/public/.well-known/jwks.json")) {
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
