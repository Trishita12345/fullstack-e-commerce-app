package com.e_commerce.authService.controller;

import java.security.KeyPair;
import java.security.interfaces.RSAPublicKey;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;

@RestController
@RequestMapping("/public")
public class JwkController {

    private final KeyPair keyPair;

    public JwkController(KeyPair keyPair) {
        this.keyPair = keyPair;
    }

    @GetMapping("/.well-known/jwks.json")
    public Map<String, Object> getKeys() {

        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();

        RSAKey key = new RSAKey.Builder(publicKey)
                .keyID("auth-key")
                .build();

        return new JWKSet(key).toJSONObject();
    }
}