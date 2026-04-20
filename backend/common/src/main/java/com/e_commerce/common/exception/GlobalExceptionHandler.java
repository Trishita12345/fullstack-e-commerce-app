package com.e_commerce.common.exception;

import java.time.Instant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.micrometer.tracing.Tracer;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final Tracer tracer;

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(
            BaseException ex,
            HttpServletRequest request) {

        ErrorResponse response = ErrorResponse.builder()
                .timestamp(Instant.now().toString())
                .status(ex.getStatus().value())
                .error(ex.getErrorCode())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .traceId(getTraceId())
                .build();

        return new ResponseEntity<>(response, ex.getStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(
            Exception ex,
            HttpServletRequest request) {
        log.error("Internal Server Error: " + ex.getMessage() + " at " + request.getRequestURI(), ex);
        ErrorResponse response = ErrorResponse.builder()
                .timestamp(Instant.now().toString())
                .status(500)
                .error("INTERNAL_SERVER_ERROR")
                .message("Something went wrong")
                .path(request.getRequestURI())
                .traceId(getTraceId())
                .build();

        return ResponseEntity.status(500).body(response);
    }

    private String getTraceId() {
        return tracer.currentSpan().context().traceId();
    }
}
