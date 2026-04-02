package com.e_commerce.common.config;

import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.e_commerce.common.security.UserHeaders;

@Configuration
public class FeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate -> {

            // Get current request headers
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes();

            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();

                // 🔥 Forward custom headers
                String userId = request.getHeader(UserHeaders.USER_ID);
                String roles = request.getHeader(UserHeaders.USER_ROLES);

                if (userId != null) {
                    requestTemplate.header(UserHeaders.USER_ID, userId);
                }

                if (roles != null) {
                    requestTemplate.header(UserHeaders.USER_ROLES, roles);
                }
            }
        };
    }
}
