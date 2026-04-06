package com.e_commerce.apiGatewayService.filter;

import java.util.UUID;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class TraceIdFilter implements GlobalFilter, Ordered {

    public static final String TRACE_ID_KEY = "X-Trace-Id";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String traceId = UUID.randomUUID().toString();
        log.info("traceId: " + traceId);
        ServerWebExchange mutatedExchange = exchange.mutate()
                .request(builder -> builder.header(TRACE_ID_KEY, traceId))
                .build();

        // ✅ store in attributes (IMPORTANT)
        mutatedExchange.getAttributes().put(TRACE_ID_KEY, traceId);

        return chain.filter(mutatedExchange);
    }

    @Override
    public int getOrder() {
        return -100;
    }

}
