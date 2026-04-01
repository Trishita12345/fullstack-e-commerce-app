package com.e_commerce.authService.configuration;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RsaKeyConfig {

    @Bean
    public KeyPair keyPair() throws Exception {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        return generator.generateKeyPair();
    }
}
