package com.e_commerce.apiGatewayService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class GatewaySwaggerConfig {

    @Bean
    OpenAPI gatewayOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("E-Commerce API Gateway")
                        .description("Gateway entry point for all services")
                        .version("1.0"))

                // 🔥 SERVERS LIST
                .addServersItem(new Server()
                        .url("http://localhost:8080/api/product-service")
                        .description("Product Service"))

                .addServersItem(new Server()
                        .url("http://localhost:8080/api/cart-service")
                        .description("Cart Service"))

                .addServersItem(new Server()
                        .url("http://localhost:8080/api/order-service")
                        .description("Order Service"));
    }
}
