
package com.e_commerce.apiGatewayService.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Value("${frontend.url}") // fallback if not set
    private String allowedOrigin;

    @Bean(name = "security")
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        return http
                .cors(cors -> Customizer.withDefaults()) // ✅ ENABLE CORS
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange -> exchange
                        .pathMatchers(
                                "/.well-known/**",
                                "/favicon.ico",
                                "/actuator/**",
                                "/public/**",
                                "/swagger-ui/**",
                                "/webjars/**",
                                "/v3/api-docs/**",
                                "/api/product-service/public/**",
                                "/api/product-service/swagger-ui/**",
                                "/api/product-service/v3/api-docs/**",
                                "/api/cart-service/public/**",
                                "/api/cart-service/swagger-ui/**",
                                "/api/cart-service/v3/api-docs/**",
                                "/api/order-service/public/**",
                                "/api/payment-service/public/**",
                                "/api/notification-service/public/**",
                                "/error")
                        .permitAll()
                        .anyExchange().authenticated())
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(
                        reactiveJwtAuthenticationConverter())))
                .build();
    }

    /**
     * Converts JWT claims → GrantedAuthorities (reactive-friendly)
     */
    @Bean
    public ReactiveJwtAuthenticationConverterAdapter reactiveJwtAuthenticationConverter() {

        JwtAuthenticationConverter delegate = new JwtAuthenticationConverter();

        delegate.setJwtGrantedAuthoritiesConverter(jwt -> {
            var authorities = new java.util.ArrayList<>(
                    new org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter()
                            .convert(jwt));

            String role = jwt.getClaimAsString("role");
            if (role != null) {
                authorities.add(() -> "ROLE_" + role.toUpperCase());
            }
            return authorities;
        });

        return new ReactiveJwtAuthenticationConverterAdapter(delegate);
    }

    @Bean
    public ReactiveJwtDecoder jwtDecoder() {
        return NimbusReactiveJwtDecoder
                .withJwkSetUri("http://localhost:3000/api/auth/jwks")
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(allowedOrigin)); // Your Vite frontend URL
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // if using cookies / auth headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
