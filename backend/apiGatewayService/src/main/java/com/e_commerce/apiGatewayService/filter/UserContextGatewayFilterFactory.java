package com.e_commerce.apiGatewayService.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;

import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

@Component
public class UserContextGatewayFilterFactory
        extends AbstractGatewayFilterFactory<UserContextGatewayFilterFactory.Config> {

    public UserContextGatewayFilterFactory() {
        super(Config.class);
        System.out.println(">>> UserContextFilter BEAN CREATED <<<");
    }

    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> ReactiveSecurityContextHolder.getContext()
                .map(ctx -> ctx.getAuthentication())
                .flatMap(authentication -> {

                    // SECURE request
                    ServerHttpRequest mutatedRequest = enrichRequest(exchange.getRequest(), authentication);

                    System.out.println("secure 2:");
                    return chain.filter(
                            exchange.mutate()
                                    .request(mutatedRequest)
                                    .build());
                })
                .switchIfEmpty(
                        // PUBLIC request
                        Mono.defer(() -> {
                            System.out.println("public 1:");
                            return chain.filter(exchange);
                        }));
    }

    private ServerHttpRequest enrichRequest(ServerHttpRequest request,
            Authentication authentication) {

        String userId = authentication.getName(); // usually sub
        String roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return request.mutate()
                .header("X-User-Id", userId)
                .header("X-User-Roles", roles)
                .build();
    }

    public static class Config {
    }
}
