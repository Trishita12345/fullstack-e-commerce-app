package com.e_commerce.authService.configuration;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "app.otp")
@Getter
@Setter
public class OtpConfig {
    private boolean whitelistEnabled;
    private List<String> whitelistPhones;
    private String whitelistOtp;
}