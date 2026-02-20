package com.e_commerce.paymentService.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Configuration
public class RazorpayConfig {

    @Value("${payment.razorpay.api-key}")
    private String apiKey;
    @Value("${payment.razorpay.secret-key}")
    private String secretKey;

    @Bean
    RazorpayClient razorpayClient() throws RazorpayException {
        return new RazorpayClient(apiKey, secretKey);
    }
}