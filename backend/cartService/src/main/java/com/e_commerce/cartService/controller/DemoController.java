package com.e_commerce.cartService.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class DemoController {

    @GetMapping("/public/hello")
    public Map<String, String> hello() {
        return Map.of("greetings", "hello ");
    }

    @GetMapping("/public/debug/user-context")
    public Map<String, Object> getUserContext(
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Roles", required = false) String roles) {

        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("roles", roles);

        return response;
    }

    @GetMapping("/debug/user-context")
    @PreAuthorize("hasRole('SELLER')")
    public Map<String, Object> debugUser(Authentication authentication) {

        return Map.of(
                "userId", authentication.getName(),
                "roles", authentication.getAuthorities());
    }
    // @GetMapping("/secure")
    // public Map<String, String> secureHello(@AuthenticationPrincipal Jwt jwt) {
    // System.out.println("jwt-principal " + jwt.getTokenValue());
    // return Map.of("greetings", "hello " + jwt.getClaim("name"));
    // }
}
