package com.e_commerce.common.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.e_commerce.common.filter.GatewayHeaderAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@EnableFeignClients
public class SecurityConfig {
    @Bean
    SecurityFilterChain gatewaySecurityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/public/**", "/swagger-ui/**", "/v3/api-docs/**", "/error", "/actuator/**")
                        .permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(
                        new GatewayHeaderAuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
