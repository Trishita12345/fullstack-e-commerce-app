package com.e_commerce.productService.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DemoController {

    @GetMapping("/public/hello")
    public Map<String,String> hello(){
        return Map.of("greetings","hello ");
    }
    @GetMapping("/secure")
    public Map<String, String> secureHello(@AuthenticationPrincipal Jwt jwt){
        System.out.println("jwt-principal "+ jwt.getTokenValue());
        return Map.of("greetings","hello "+jwt.getClaim("name"));
    }
}
