package com.e_commerce.common.config;

import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Enumeration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignConfig {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {

            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes();

            if (attributes == null) {
                return;
            }

            HttpServletRequest request = attributes.getRequest();

            Enumeration<String> headerNames = request.getHeaderNames();

            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();

                if ("content-length".equalsIgnoreCase(headerName)
                        || "host".equalsIgnoreCase(headerName)) {
                    continue;
                }

                Enumeration<String> headerValues = request.getHeaders(headerName);

                while (headerValues.hasMoreElements()) {
                    requestTemplate.header(headerName, headerValues.nextElement());
                }
            }
        };
    }
}
