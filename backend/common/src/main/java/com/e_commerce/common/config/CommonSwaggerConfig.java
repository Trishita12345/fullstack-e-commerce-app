package com.e_commerce.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommonSwaggerConfig {

        @Value("${gateway.base-url:}")
        private String gatewayBaseUrl;

        @Value("${gateway.api-description:}")
        private String description;

        @Bean
        public OpenAPI commonOpenAPI() {

                SecurityScheme bearerAuth = new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .name("Authorization");

                OpenAPI openAPI = new OpenAPI()
                                .components(new Components()
                                                .addSecuritySchemes("bearerAuth", bearerAuth))
                                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));

                // ✅ Add gateway server ONLY if provided
                if (!gatewayBaseUrl.isBlank()) {
                        openAPI.addServersItem(
                                        new Server()
                                                        .url(gatewayBaseUrl)
                                                        .description(description));
                }

                return openAPI;
        }
}
