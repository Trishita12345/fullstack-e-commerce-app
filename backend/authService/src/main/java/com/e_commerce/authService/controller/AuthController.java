package com.e_commerce.authService.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.authService.model.dto.OTpVerifyRequest;
import com.e_commerce.authService.model.dto.TokenResponse;
import com.e_commerce.authService.service.IAuthApplicationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/public/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthApplicationService authService;

    @PostMapping("/request-otp")
    public ResponseEntity<String> requestOtp(@RequestBody Map<String, String> request) {
        authService.requestOtp(request.get("phone"));
        return ResponseEntity.ok("OTP sent");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<TokenResponse> verifyOtp(@RequestBody OTpVerifyRequest request) {

        TokenResponse response = authService.verifyOtp(
                request.getPhone(),
                request.getOtp(),
                request.getDeviceId());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@RequestBody Map<String, String> request) {

        TokenResponse response = authService.refresh(request.get("refreshToken"));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody Map<String, String> request) {

        authService.logout(request.get("refreshToken"));

        return ResponseEntity.ok("Logged out successfully");
    }
}
