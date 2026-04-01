package com.e_commerce.common.config;

import feign.Logger;
import feign.RequestInterceptor;
import feign.RequestTemplate;

import java.util.stream.Collectors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

@Configuration
public class FeignConfig {

    /**
     * Forward Authorization header to downstream services
     */
    @Bean
    public RequestInterceptor requestInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate template) {

                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                if (authentication != null) {

                    String userId = authentication.getName();
                    String roles = authentication.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(","));

                    template.header("X-User-Id", userId);
                    template.header("X-User-Roles", roles);
                }
            }
        };
    }

    /**
     * Enable Feign logs (VERY helpful while learning)
     */
    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.BASIC;
    }
}
