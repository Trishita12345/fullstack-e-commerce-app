package com.e_commerce.apiGatewayService.exception;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.micrometer.tracing.Tracer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class GlobalErrorHandler implements ErrorWebExceptionHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Tracer tracer;

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {

        HttpStatus status = determineStatus(ex);

        ErrorResponse response;

        if (ex instanceof BaseException baseEx) {
            response = ErrorResponse.builder()
                    .timestamp(Instant.now().toString())
                    .status(baseEx.getStatus().value())
                    .error(baseEx.getErrorCode())
                    .message(baseEx.getMessage())
                    .path(exchange.getRequest().getPath().value())
                    .traceId(tracer.currentSpan().context().traceId())
                    .build();
        } else {
            response = ErrorResponse.builder()
                    .timestamp(Instant.now().toString())
                    .status(status.value())
                    .error(status.name())
                    .message(resolveMessage(ex))
                    .path(exchange.getRequest().getPath().value())
                    .traceId(tracer.currentSpan().context().traceId())
                    .build();
        }

        exchange.getResponse().setStatusCode(status);
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);

        byte[] bytes;
        try {
            bytes = objectMapper.writeValueAsBytes(response);
        } catch (Exception e) {
            bytes = "{\"message\":\"Internal error\"}".getBytes(StandardCharsets.UTF_8);
        }

        return exchange.getResponse()
                .writeWith(Mono.just(exchange.getResponse()
                        .bufferFactory()
                        .wrap(bytes)));
    }

    // 🔥 Map exceptions → HTTP status
    private HttpStatus determineStatus(Throwable ex) {
        if (ex instanceof BaseException baseEx) {
            return baseEx.getStatus();
        }
        if (ex instanceof AccessDeniedException) {
            return HttpStatus.FORBIDDEN;
        }
        if (ex instanceof AuthenticationCredentialsNotFoundException) {
            return HttpStatus.UNAUTHORIZED;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    // 🔥 Clean error messages
    private String resolveMessage(Throwable ex) {
        if (ex instanceof AccessDeniedException) {
            return "Access Denied";
        }
        if (ex instanceof AuthenticationCredentialsNotFoundException) {
            return "Unauthorized";
        }
        return "Something went wrong";
    }

}