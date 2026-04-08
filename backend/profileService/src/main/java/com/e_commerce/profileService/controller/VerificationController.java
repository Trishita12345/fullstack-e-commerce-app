package com.e_commerce.profileService.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.common.exception.BaseException;
import com.e_commerce.profileService.service.IVerificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/verify")
@RequiredArgsConstructor
public class VerificationController {

    private final IVerificationService verificationService;

    @PostMapping("/email")
    @Async
    public ResponseEntity<String> generateVerifyEmail(@RequestParam String email) {
        verificationService.generateEmailVerification(email);
        return ResponseEntity.ok("Email verification generated successfully");
    }

    @GetMapping("/email")
    public ResponseEntity<String> verifyEmail(@RequestParam String email, @RequestParam String verificationCode) {
        if (verificationService.verifyEmail(email, verificationCode)) {
            return ResponseEntity.ok("Email verified successfully");
        } else {
            throw new BaseException("Invalid Verification Code", HttpStatus.BAD_REQUEST, "INVALID_EMAIL_OTP");
        }
    }
}
