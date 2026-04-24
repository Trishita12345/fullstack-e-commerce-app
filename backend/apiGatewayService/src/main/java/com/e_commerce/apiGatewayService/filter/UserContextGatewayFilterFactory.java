package com.e_commerce.apiGatewayService.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserContextGatewayFilterFactory
        extends AbstractGatewayFilterFactory<UserContextGatewayFilterFactory.Config> {

    public UserContextGatewayFilterFactory() {
        super(Config.class);
        System.out.println(">>> UserContextFilter BEAN CREATED <<<");
    }

    @SuppressWarnings("null")
    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> ReactiveSecurityContextHolder.getContext()
                .defaultIfEmpty(new SecurityContextImpl())
                .flatMap(ctx -> {
                    Authentication auth = ctx.getAuthentication();

                    if (auth == null || !auth.isAuthenticated()) {
                        return chain.filter(exchange); // or reject
                    }

                    ServerHttpRequest mutated = enrichRequest(exchange.getRequest(), auth);
                    return chain.filter(exchange.mutate().request(mutated).build());
                });
    }

    private ServerHttpRequest enrichRequest(ServerHttpRequest request,
            Authentication authentication) {

        String userId = authentication.getName(); // usually sub
        String roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return request.mutate()
                .headers(headers -> {
                    headers.remove("X-User-Id");
                    headers.remove("X-User-Roles");
                })
                .header("X-User-Id", userId)
                .header("X-User-Roles", roles)
                .build();
    }

    public static class Config {
    }
}
