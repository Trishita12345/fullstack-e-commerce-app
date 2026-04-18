package com.e_commerce.notificationService.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "fast2sms")
@Data
public class Fast2SmsConfig {
    private String apiKey;
}